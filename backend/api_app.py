from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from database_handler import *


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def read_root():
    return {}

@app.get('/edges/')
async def get_edges():
    pass

@app.get('/nodes/')
async def get_nodes():
    return find_all(COLLECTION_NODES)

@app.get('/news/')
async def get_news():
    return find_all(COLLECTION_NEWS)

# to run ...
# pip install -r API_requirements.txt
# uvicorn API:app --host 0.0.0.0 --port 10000
