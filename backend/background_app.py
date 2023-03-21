from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from dateutil import parser
from hashlib import sha256
import json
import os
from database_handler import *


SCRAPER_MAPPINGS = {
    'CNBC': {
        'save_file': 'articles_cnbc.json',
        'spider': 'cnbc_spider'
    },
    'Straits_Times': {
        'save_file': 'articles_straits_times.json',
        'spider': 'straits_times_spider'
    },
    'Yahoo': {
        'save_file': 'articles_yahoo.json',
        'spider': 'yahoo_spider'
    }
}

VISITED_URLS_PATH = 'visited_urls.txt'
SCRAPY_PROJ_PATH = 'webscraper'
SHA256_SECRET_KEY = 'd8b04a8a85e1cf3e4797366aa8d77769963fdbef167ed9e8cd2cb220f5287629'


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'], 
    allow_headers=['*'],
)


def verify_origin(secret: str) -> bool:
    '''
    Check if request has the correct API secret key

    :param str secret: Secret key from request
    :return: True if SHA256 hash of secret corresponds to SHA256_SECRET_KEY, else False
    :rtype: bool
    '''
    return SHA256_SECRET_KEY == sha256(secret.encode('utf-8')).hexdigest()

def timestamp_to_epoch(timestamp) -> int:
    '''
    ISO 8601 datestring to unix timestamp
    :param str timestamp: ISO 8601 datestring
    :return: Unix timestamp
    :rtype: int
    '''
    return int(parser.parse(timestamp).timestamp())

@app.get('/')
def read_root():
    return

@app.get('/scrape/')
def start_scrape(secret: str) -> dict:
    '''
    Run Scrapy spiders & save scraped data as JSON files in {SCRAPY_PROJ_PATH}/{SCRAPY_PROJ_PATH}
    A CRON job will call this endpoint every fixed time interval.

    :param str secret: API secret key. If valid, then scrape, else ignore this GET request
    :return: Object that states the Scrapy spiders that were executed.
    :rtype: dict
    '''
    if not verify_origin(secret):
        return 'Invalid secret key'
    
    response = {}
    print(os.getcwd())
    os.chdir(SCRAPY_PROJ_PATH)
    for scraper in SCRAPER_MAPPINGS:
        scraper_obj = SCRAPER_MAPPINGS[scraper]
        response[scraper] = 'Done'

        os.system(f'scrapy crawl -o {scraper_obj["save_file"]} -t json {scraper_obj["spider"]}')
    os.chdir('../')
    print(os.getcwd())
    return response

@app.get('/nlp-processing/')
def nlp_processing() -> dict:
    '''
    Remove outdated data.
    Read scraped data outputs and conduct keyword extraction, followed by topic modelling and relation extraction.
    Store node and news data to MongoDB.
    Update list of visited URLs to prevent repeat work.

    :return: Object that states the scraped data that have been processed.
    :rtype: dict
    '''
    response = {}
    news_docs = [] # news documents to be inserted
    nodes_docs = [] # nodes documents to be inserted
    relations = []
    keywords = []
    topics = []
    nodes = {}

    # remove outdated documents (7 days or more)
    clean_up_by_date(7)

    visited = '\n'.join(list(map(lambda doc:doc['url'], find_all(COLLECTION_NEWS))))
    
    # read scraped data from each of the Scrapy spiders
    for scraper in SCRAPER_MAPPINGS:
        filepath = SCRAPER_MAPPINGS[scraper]['save_file']
        response[scraper] = 'Done'

        with open(filepath, 'r') as f:
            data = json.load(f) # read & parse JSON file data

            for article_obj in data:
                doc = {
                    'title': article_obj['Title'],
                    'url': article_obj['URL'],
                    'datetime': timestamp_to_epoch(article_obj['Date'])
                }

                visited += article_obj['URL'] + '\n'

                # keyword extraction
                for i, kw in enumerate(keywords):
                    if kw in nodes:
                        nodes[kw] += 1
                    else:
                        nodes[kw] = 1

                    doc[f'key{i+1}'] = kw

                # topic modelling
                for i, topic in enumerate(topics):
                    doc[f'topic{i+1}'] = topic

                news_docs.append(doc)

                # relation extraction
                for relation in relations:
                    pass

    for doc in find_all(COLLECTION_NODES):
        data = doc['data']
        freq = doc['freq']
        if data in nodes:
            freq += nodes[data]
        else:
            freq = nodes[data]

        nodes_docs.append({'data': data, 'freq': freq})

    # save to database
    delete_many(COLLECTION_NODES, {}) # delete all nodes
    insert_many(nodes_docs)
    insert_many(news_docs)

    # update visited_urls.txt
    with open(VISITED_URLS_PATH, 'w') as g:
        g.write(visited.strip())

    return response

# to run ...
# pip install -r API_requirements.txt
# uvicorn API:app --host 0.0.0.0 --port 10000
