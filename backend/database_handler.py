from pymongo import MongoClient
import time
# from dotenv import load_dotenv, find_dotenv
# import os

# load env variable file
# load_dotenv(find_dotenv())
# password = os.environ.get("MONGODB_PWD")

PASSWORD = 'E1T7t9wCQQznDDkp'
CONNECTION_STRING = f'mongodb+srv://admin:{PASSWORD}@cluster0.xo29eao.mongodb.net/?retryWrites=true&w=majority'
DB_NAME = 'project-glovo'
KEYWORDS_PER_ARTICLE = 5
COLLECTION_NEWS = 'news'
COLLECTION_NODES = 'nodes'

client = MongoClient(CONNECTION_STRING)
db = client[DB_NAME]


def init_db():
    db[COLLECTION_NODES].insert_one({
        'data': 'singapore',
        'freq': 81
    })
    db[COLLECTION_NODES].insert_one({
        'data': 'balloon',
        'freq': 34
    })
    db[COLLECTION_NEWS].insert_one({
        'title': 'France faces massive strikes over pension reform',
        'url': 'https://sg.news.yahoo.com/france-faces-massive-strikes-over-110142399.html',
        'datetime': 1678030483,
        'key1': 'france',
        'key2': 'pension',
        'key3': 'reform',
        'key4': 'strike',
        'key5': 'government',
        'topic1': 'politics',
        'topic2': 'rights'
    })


'''
Insert multiple documents
@param collection Collection name
@param docs Document object to be inserted
'''
def insert_many(collection: str, docs: dict):
    db[collection].insert_many(docs)


'''
Insert a document
@param collection Collection name
@param docs Document object to be inserted
'''
def insert_one(collection: str, doc: dict):
    db[collection].insert_one(doc)


'''
Update a document
@param collection Collection name
@param condition Match condition
@param target New values to be updated to
@param upsert If True, update if found, otherwise insert. False by default
'''
def update_one(collection: str, condition: dict, target: dict, upsert: bool = False):
    db[collection].update_one(condition, target, upsert=upsert)
    

'''
Get all documents for a specific collection
@param collection Collection name
@returns List of documents
'''
def find_all(collection: str) -> list:
    cursor = db[collection].find()

    return list(cursor)


'''
Delete multiple documents
@param collection Collection name
@param condition Match condition
@returns Number of documents deleted
'''
def delete_many(collection: str, condition) -> int:
    return db[collection].delete_many(condition).deleted_count


'''
Remove all news documents where publish date is older than specified days old
Decrement frequency of nodes that were keywords of the news documents deleted
@param days Lower limit for publish date
@returns Dict of number of nodes and news documents deleted
'''
def clean_up_by_date(days: int) -> dict:
    lower_limit = time.time() - days * 24 * 60 * 60
    decrement_keywords = {}
    delete_nodes = []
    key = ''
    count = 0
    updated_nodes = 0
    deleted_nodes = 0
    deleted_news = 0
    docs = find_all(COLLECTION_NEWS)

    for doc in docs:
        if doc['datetime'] < lower_limit:
            for i in range(1, KEYWORDS_PER_ARTICLE + 1):
                key = f'key{i}'
                if key in doc:
                    if key not in decrement_keywords:
                        decrement_keywords[key] = 1
                    else:
                        decrement_keywords[key] += 1
                else:
                    break

    docs = find_all(COLLECTION_NODES)
    for doc in docs:
        key = doc['data']
        if key in decrement_keywords:
            count = int(decrement_keywords[key])
            if key == count:
                delete_nodes.append(key)
            else:
                update_one(COLLECTION_NODES, {'data': key}, {'freq': doc['freq'] - count})
                updated_nodes += 1

    deleted_nodes = delete_many(COLLECTION_NODES, {'data': {'$in': delete_nodes}})
    deleted_news = delete_many(COLLECTION_NEWS, {'datetime': {'$lt': lower_limit}})

    return {'Updated Nodes': updated_nodes, 'Deleted Nodes': deleted_nodes, 'Deleted News': deleted_news}