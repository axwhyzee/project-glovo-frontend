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
        'save_file': 'articles_straits.json',
        'spider': 'straits_spider'
    },
    'Yahoo': {
        'save_file': 'articles_yahoo.json',
        'spider': 'yahoo_spider'
    }
}

VISITED_URLS_PATH = 'visited_urls.txt'


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'], 
    allow_headers=['*'],
)

SHA256_SECRET_KEY = 'd8b04a8a85e1cf3e4797366aa8d77769963fdbef167ed9e8cd2cb220f5287629' # secret_key_0026

def verify_origin(secret):
    return SHA256_SECRET_KEY == sha256(secret.encode('utf-8')).hexdigest()

def timestamp_to_epoch(timestamp): # ISO 8601 datestring
    return int(parser.parse(timestamp).timestamp())

@app.get('/')
def read_root():
    return {}

@app.get('/scrape/')
def start_scrape(secret: str):
    # run scraper, save scraped data as JSON files

    if not verify_origin(secret):
        return
    
    response = {}
    
    for scraper in SCRAPER_MAPPINGS:
        scraper_obj = SCRAPER_MAPPINGS[scraper]
        response[scraper] = 'Done'

        # os.system(f'scrapy crawl -o {scraper_obj["save_file"]} -t json {scraper_obj["spider"]}')

    return response

@app.get('/nlp-processing/')
def nlp_processing():
    response = {}
    news_docs = [] # news documents to be inserted
    nodes_docs = [] # nodes documents to be inserted
    relations = {}
    nodes = {}

    # remove outdated documents
    clean_up_by_date(7)

    visited = '\n'.join(list(map(lambda doc:doc['url'], find_all(COLLECTION_NEWS))))
    
    for scraper in SCRAPER_MAPPINGS:
        filepath = SCRAPER_MAPPINGS[scraper]['save_file']
        response[scraper] = 'Done'

        # read scraped data
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
                keywords = []
                
                for i, kw in enumerate(keywords):
                    if kw in nodes:
                        nodes[kw] += 1
                    else:
                        nodes[kw] = 1

                    doc[f'key{i+1}'] = kw

                # topic modelling
                topics = []
                for i, topic in enumerate(topics):
                    doc[f'topic{i+1}'] = topic

                news_docs.append(doc)

                # relation extraction
                relations = []
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
