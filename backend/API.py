from fastapi import FastAPI
import asyncio
import random


app = FastAPI()

# each element is a list of keyphrases taken from a separate news article
groups = [
    ['china', 'u.s.', 'chinese_foreign_ministry', 'balloon', 'american', 'beijing', 'south carolina', 'international_law', 'nationalist', 'social_media', 'american_plane', 'chinese_internet'],
    ['turkey', 'syria', 'earthquake', 'assistance', 'crisis_management', 'emergency_mapping_service', 'un', 'government', 'rescue_workers'],
    ['stock_markets', 'u.s.', 'us_jobs_report', 'inflation', 'equity_market', 'eurozone_stock_markets', 'unemployment', 'fed', 'investors'],
    ['india', 'green_bonds', 'green_infrastructure', 'sustainable', 'green_debt'],
    ['bhutan', 'solar_energy_generation', 'electricity_imports', 'india', 'himalayan_kingdom'],
    ['india', 'gst', 'merger', 'tax_rate', 'custom_duty', 'government'],
    ['nurses', 'ambulance_staff', 'inflation', 'strike'],
    ['beijing', 'balloon', 'latin_america', 'weather_surveillance_aircraft', 'surveillance', 'chinese']
]

ngroups = len(groups)-1 


async def gen_edges(n: int): 
    data = []
    done = set()

    while len(data) < n:
        grp_idx = random.randint(0, ngroups)
        grp = groups[grp_idx]

        a = random.choice(grp)
        b = random.choice(grp)
        k = random.randint(1,50) # weight

        tup = tuple(sorted([a, b])) # to track if a particular pair has been done before
        
        if a!=b and tup not in done:
            data.append({'src': a, 'dst': b, 'k': [k]})
            done.add(tup)

    return data

@app.get('/')
def read_root():
    return {}

@app.get('/edges/')
async def get_edges(n: int = 50): # generate 50 by default, unless specified
    if n > 100:
        return {"Response": "N must be <= 100"}
    
    task = asyncio.create_task(gen_edges(n)) 
    
    return await task


# to run ...
# pip install -r API_requirements.txt
# uvicorn API:app --host 0.0.0.0 --port 10000
