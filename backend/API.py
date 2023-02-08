from fastapi import FastAPI
import asyncio
import random


app = FastAPI()

# each element is a list of keyphrases taken from a separate news article
phrase_groups = [
    ['china', 'u.s.', 'beijing', 'international_law', 'government', 'balloon', 'surveillance', 'china', 'spy', 'balloon', 'debris', 'us', 'china', 'us', 'defence', 'spy', 'balloon', 'international_law', 'explosives', 'china', 'u.s.', 'surveillance', 'white_house', 'china', 'u.s.', 'balloon', 'political_uproar', 'beijing', 'china', 'washington', 'us', 'surveillance', 'spy', 'chinese', 'spy', 'balloon', 'social_media', 'national_security', 'spying', 'tiktok', 'u.s.', 'bytedance', 'national_defence', 'china', 'u.s.', 'beijing', 'international_law', 'government', 'balloon', 'surveillance', 'china', 'spy', 'balloon', 'debris', 'us', 'us', 'intel_secrets', 'balloon', 'china', 'weather_observation_aircraft', 'spying', 'national_security_council', 'spy', 'china', 'us', 'defence', 'spy', 'balloon', 'international_law', 'explosives', 'china', 'u.s.', 'surveillance', 'white_house', 'china', 'u.s.', 'balloon', 'political_uproar', 'beijing', 'china', 'washington', 'us', 'surveillance', 'spy'],
    ['syria', 'turkey', 'earthquake', 'rescuers', 'rescue_workers', 'turkey', 'syria', 'rescue_efforts', 'health_ministry', 'international_aid', 'survivors', 'turkey', 'syria', 'rescuers', 'civil_war', 'international_response'],
    ['january', 'big_tech', 'non_form_payrolls', 'unemployment_rate', 'earnings', 'jobs_reports', 'labor_market', 'fed', 'inflation', 'employment', 'demand_shock', 'jobs_report', 'employment', 'u.s.', 'fed', 'unemployment_rate'],
    ['green_debt', 'india', 'green_bonds', 'green_financing', 'environment', 'green_energy', 'net_zero_plan', 'net_zero_emissions', 'green_financing', 'green_bond', 'indian_government', 'carbon_footprint', 'investors'],
    ['bhutan', 'solar_capacity', 'solar_energy', 'india', 'himalayan_kingdom', 'energy_imports'],
    ['india', 'gst', 'custom_duty', 'tax_treaties', 'gst', 'india', 'tax_structure', 'tax_bands', 'custom_duty', 'windfall_tax', 'tax_treaties'],
    ['uk', 'nurses', 'ambulance_staff', 'inflation', 'strike', 'strike', 'uk', 'union', 'inflation', 'civil_servants', 'health_service', 'britain', 'nurses', 'ambulance_staff', 'nhs', 'inflation', 'trade_union', 'ambulance_workers']
]
n_phrase_groups = len(phrase_groups)-1 

publishers = {
    0: 'South CHina Morning Post',
    1: 'BBC',
    2: 'CNN',
    3: 'Yahoo News',
    4: 'Straits Times',
    5: 'Reuters',
    6: 'CNBC',
    7: 'Economic Times',
    8: 'CNA'
}

# title, URL, publisher, date, keywords
news = [
    ['TikTok’s critics use Chinese spy balloon to attack the app', 'https://www.nbcnews.com/tech/social-media/chinese-spy-balloon-tiktok-security-republicans-surveillance-rcna69432', 6, '07-02-2023', ['chinese', 'spy', 'balloon', 'social_media', 'national_security', 'spying', 'tiktok', 'u.s.', 'bytedance', 'national_defence']],
    ['When did China first know its balloon was in US airspace?', 'https://www.scmp.com/news/china/diplomacy/article/3209222/china-lodges-complaint-us-over-balloon-downing', 0, '07-02-2023', ['china', 'u.s.', 'beijing', 'international_law', 'government', 'balloon', 'surveillance']],
    ['China spy balloon: US Navy releases photos of debris', 'https://www.bbc.com/news/world-us-canada-64562100', 1, '08-02-2023', ['china', 'spy', 'balloon', 'debris', 'us']],
    ['US says China gave up intel secrets with balloon shoot-down', 'https://www.channelnewsasia.com/world/us-says-china-gave-intel-secrets-balloon-shoot-down-3258406', 8, '07-02-2023', ['us', 'intel_secrets', 'balloon', 'china', 'weather_observation_aircraft', 'spying', 'national_security_council', 'spy']],
    ['China refused conversation with US defense secretary following downing of suspected spy balloon', 'https://www.cnn.com/2023/02/07/politics/china-refuses-lloyd-austin-call-balloon/index.html', 2, '08-02-2023', ['china', 'us', 'defence', 'spy', 'balloon', 'international_law']],
    ['U.S. was worried Chinese spy balloon might be carrying explosives', 'https://sg.news.yahoo.com/chinese-balloon-shot-down-explosives-debris-concerns-norad-212444664.html', 3, '07-02-2023', ['explosives', 'china', 'u.s.', 'surveillance', 'white_house']],
    ['\'Contradictions\' in China balloon incident: analyst', 'https://sg.news.yahoo.com/contradictions-china-balloon-incident-analyst-103022160.html', 3, '07-02-2023', ['china', 'u.s.', 'balloon', 'political_uproar', 'beijing']],
    ['US shooting of Chinese balloon an overreaction, says Beijing', 'https://www.straitstimes.com/asia/east-asia/us-shooting-of-chinese-balloon-an-overreaction-says-beijing', 4, '05-02-2023', ['china', 'washington', 'us', 'surveillance', 'spy']],
    ['At least 592 dead in Syria after Turkey earthquake', 'https://sg.news.yahoo.com/least-50-dead-syria-earthquake-045625393.html', 3, '06-02-2023', ['syria', 'turkey', 'earthquake', 'rescuers', 'rescue_workers']],
    ['What we know about the Turkey and Syria earthquake', 'https://sg.news.yahoo.com/know-turkey-syria-earthquake-114156571.html', 3, '07-02-2023', ['turkey', 'syria', 'rescue_efforts', 'health_ministry', 'international_aid']],
    ['Survivors are still being pulled from the rubble more than 24 hours after Turkey earthquake', 'https://edition.cnn.com/2023/02/06/europe/turkey-syria-earthquake-tuesday-intl-hnk/index.html', 2, '07-02-2023', ['survivors', 'turkey', 'syria', 'rescuers', 'civil_war', 'international_response']],
    ['January jobs report: U.S. adds 517,000 jobs, blowing past estimates', 'https://finance.yahoo.com/video/january-jobs-report-u-adds-134853869.html', 3, '03-02-2023', ['january', 'big_tech', 'non_form_payrolls', 'unemployment_rate', 'earnings', 'jobs_reports', 'labor_market']],
    ['Fed vs. inflation: Economy is \‘doing well under pressure being put on it,\’ strategist explains', 'https://finance.yahoo.com/video/fed-vs-inflation-economy-doing-204007287.html', 3, '08-02-2023', ['fed', 'inflation', 'employment', 'demand_shock']],
    ['Jobs report: \'Certainly a head scratcher,\' Wall Street analysts react', 'https://sg.news.yahoo.com/jobs-report-certainly-a-head-scratcher-wall-street-analysts-react-193000504.html', 3, '04-02-2023', ['jobs_report', 'employment', 'u.s.', 'fed', 'unemployment_rate']],
    ['India\'s markets regulator asks green debt issuers to appoint third-party reviewer', 'https://sg.news.yahoo.com/indias-markets-regulator-asks-green-124556422.html', 3, '06-02-2023', ['green_debt', 'india', 'green_bonds', 'green_financing', 'environment']],
    ['Adani’s crisis points to the big risk in India’s net-zero plan', 'https://www.straitstimes.com/asia/adani-s-crisis-points-to-the-big-risk-in-india-s-net-zero-plan', 4, '06-02-2023', ['green_energy', 'net_zero_plan', 'net_zero_emissions', 'green_financing']],
    ['India\'s first green bond sale to command \'greenium\' on strong demand - sources', 'https://www.reuters.com/world/india/indias-first-green-bond-sale-command-greenium-strong-demand-sources-2023-01-24/#:~:text=The%20RBI%20will%20auction%2040,%25%20and%207.35%25%2C%20respectively.', 5, '24-01-2023', ['green_bond', 'indian_government', 'carbon_footprint', 'investors']],
    ['Bhutan to add more solar capacity to reduce reliance on imports - minister', 'https://www.reuters.com/business/energy/bhutan-add-more-solar-capacity-reduce-reliance-imports-minister-2023-02-06/', 5, '06-02-2023', ['energy_imports', 'bhutan', 'solar_capacity', 'solar_energy', 'india', 'himalayan_kingdom']],
    ['India will not merge GST tax rates in 2023/24 - government official', 'https://www.reuters.com/world/india/india-will-not-merge-gst-tax-rates-202324-government-official-2023-02-06/', 5, '06-02-2023', ['india', 'gst', 'custom_duty', 'tax_treaties']],
    ['UK healthcare workers, ambulance crews strike for fair wages amid soaring inflation', 'https://www.cnbctv18.com/world/uk-healthcare-workers-nurses-ambulance-crews-strike-fair-wages-soaring-inflation-15865851.htm', 6, '06-02-2023', ['uk', 'nurses', 'ambulance_staff', 'inflation', 'strike']],
    ['Britain hit by biggest strike in more than a decade with schools shut and rail networks disrupted', 'https://www.cnbc.com/2023/02/01/uk-strikes-half-a-million-brits-are-taking-part-in-the-biggest-walkout-for-12-years.html', 6, '01-02-2023', ['strike', 'uk', 'union', 'inflation', 'civil_servants']],
    ['British workers stage largest strike in history of health service', 'https://www.straitstimes.com/world/europe/britain-faces-largest-ever-healthcare-strikes-as-pay-disputes-drag-on', 4, '06-02-2023', ['health_service', 'britain', 'nurses', 'ambulance_staff', 'nhs', 'inflation', 'trade_union', 'ambulance_workers']],
    ['India will not merge GST tax rates in 2023/24, government official says', 'https://economictimes.indiatimes.com/news/economy/finance/india-will-not-merge-gst-tax-rates-in-2023/24-government-official-says/articleshow/97646879.cms', 7, '06-02-2023', ['gst', 'india', 'tax_structure', 'tax_bands', 'custom_duty', 'windfall_tax', 'tax_treaties']]
]


async def random_edges(n: int): 
    data = []
    done = set()

    while len(data) < n:
        grp = random.choice(phrase_groups)

        a = random.choice(grp)
        b = random.choice(grp)
        k = random.randint(1,50) # weight

        tup = tuple(sorted([a, b])) # to track if a particular pair has been done before
        
        if a!=b and tup not in done:
            data.append({'src': a, 'dst': b, 'k': [k]})
            done.add(tup)

    return data

async def compile_news():
    res = []
    for news_obj in news:
        obj = {}
        obj['title'] = news_obj[0]
        obj['URL'] = news_obj[1]
        obj['publisher'] = publishers[news_obj[2]]
        obj['date'] = news_obj[3]
        obj['keywords'] = news_obj[4]

        res.append(obj)

    return res

@app.get('/')
def read_root():
    return {}

@app.get('/edges/')
async def get_edges(n: int = 50): # generate 50 by default, unless specified
    if n > 100:
        return {"Response": "N must be <= 100"}
    
    task = asyncio.create_task(random_edges(n)) 
    
    return await task

@app.get('/news/')
async def get_news():
    task = asyncio.create_task(compile_news())

    return await task

# to run ...
# pip install -r API_requirements.txt
# uvicorn API:app --host 0.0.0.0 --port 10000
