from fastapi import FastAPI
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

@app.get('/')
def read_root():
    return {}

@app.get('/edges/{n}')
def get_edges(n: int):
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

    
'''
[{"src":"india","dst":"green_infrastructure","k":[33]},{"src":"un","dst":"syria","k":[18]},{"src":"surveillance","dst":"latin_america","k":[18]},{"src":"green_debt","dst":"green_bonds","k":[40]},{"src":"chinese_foreign_ministry","dst":"international_law","k":[7]},{"src":"u.s.","dst":"equity_market","k":[26]},{"src":"international_law","dst":"nationalist","k":[19]},{"src":"emergency_mapping_service","dst":"government","k":[30]},{"src":"unemployment","dst":"us_jobs_report","k":[6]},{"src":"ambulance_staff","dst":"inflation","k":[15]},{"src":"bhutan","dst":"solar_energy_generation","k":[29]},{"src":"nurses","dst":"inflation","k":[11]},{"src":"eurozone_stock_markets","dst":"inflation","k":[15]},{"src":"stock_markets","dst":"investors","k":[47]},{"src":"beijing","dst":"international_law","k":[17]},{"src":"green_debt","dst":"green_infrastructure","k":[21]},{"src":"balloon","dst":"american_plane","k":[15]},{"src":"balloon","dst":"surveillance","k":[34]},{"src":"eurozone_stock_markets","dst":"investors","k":[12]},{"src":"gst","dst":"merger","k":[25]},{"src":"china","dst":"chinese_foreign_ministry","k":[45]},{"src":"emergency_mapping_service","dst":"un","k":[40]},{"src":"stock_markets","dst":"u.s.","k":[2]},{"src":"fed","dst":"unemployment","k":[8]},{"src":"india","dst":"sustainable","k":[44]},{"src":"chinese_foreign_ministry","dst":"nationalist","k":[18]},{"src":"nurses","dst":"strike","k":[5]},{"src":"social_media","dst":"american","k":[28]},{"src":"strike","dst":"inflation","k":[33]},{"src":"solar_energy_generation","dst":"india","k":[15]},{"src":"international_law","dst":"american","k":[35]},{"src":"china","dst":"u.s.","k":[10]},{"src":"u.s.","dst":"inflation","k":[11]},{"src":"electricity_imports","dst":"solar_energy_generation","k":[45]},{"src":"balloon","dst":"beijing","k":[6]},{"src":"tax_rate","dst":"merger","k":[47]},{"src":"india","dst":"government","k":[28]},{"src":"u.s.","dst":"fed","k":[17]},{"src":"green_debt","dst":"sustainable","k":[6]},{"src":"ambulance_staff","dst":"strike","k":[37]},{"src":"chinese_internet","dst":"social_media","k":[49]},{"src":"himalayan_kingdom","dst":"india","k":[19]},{"src":"green_debt","dst":"india","k":[43]},{"src":"china","dst":"chinese_internet","k":[32]},{"src":"bhutan","dst":"electricity_imports","k":[9]},{"src":"government","dst":"custom_duty","k":[10]},{"src":"bhutan","dst":"himalayan_kingdom","k":[8]},{"src":"custom_duty","dst":"tax_rate","k":[8]},{"src":"india","dst":"gst","k":[29]},{"src":"ambulance_staff","dst":"nurses","k":[19]},{"src":"india","dst":"green_bonds","k":[39]},{"src":"gst","dst":"custom_duty","k":[1]},{"src":"international_law","dst":"social_media","k":[10]},{"src":"south carolina","dst":"balloon","k":[31]},{"src":"surveillance","dst":"beijing","k":[45]},{"src":"unemployment","dst":"eurozone_stock_markets","k":[22]},{"src":"green_infrastructure","dst":"green_bonds","k":[26]},{"src":"beijing","dst":"china","k":[4]},{"src":"merger","dst":"custom_duty","k":[17]},{"src":"beijing","dst":"weather_surveillance_aircraft","k":[4]},{"src":"merger","dst":"government","k":[21]},{"src":"equity_market","dst":"fed","k":[1]},{"src":"india","dst":"tax_rate","k":[29]},{"src":"stock_markets","dst":"us_jobs_report","k":[5]},{"src":"government","dst":"tax_rate","k":[1]},{"src":"china","dst":"american_plane","k":[8]},{"src":"assistance","dst":"rescue_workers","k":[32]},{"src":"surveillance","dst":"chinese","k":[3]},{"src":"emergency_mapping_service","dst":"assistance","k":[20]},{"src":"merger","dst":"india","k":[23]},{"src":"emergency_mapping_service","dst":"syria","k":[23]},{"src":"international_law","dst":"south carolina","k":[16]},{"src":"inflation","dst":"equity_market","k":[35]},{"src":"earthquake","dst":"turkey","k":[21]},{"src":"assistance","dst":"syria","k":[19]},{"src":"himalayan_kingdom","dst":"solar_energy_generation","k":[23]},{"src":"syria","dst":"turkey","k":[9]},{"src":"turkey","dst":"emergency_mapping_service","k":[23]},{"src":"weather_surveillance_aircraft","dst":"chinese","k":[22]},{"src":"south carolina","dst":"chinese_internet","k":[21]},{"src":"chinese_foreign_ministry","dst":"balloon","k":[17]},{"src":"surveillance","dst":"weather_surveillance_aircraft","k":[15]},{"src":"inflation","dst":"stock_markets","k":[11]},{"src":"chinese_foreign_ministry","dst":"american_plane","k":[30]},{"src":"chinese","dst":"beijing","k":[4]},{"src":"turkey","dst":"un","k":[22]},{"src":"turkey","dst":"rescue_workers","k":[26]},{"src":"rescue_workers","dst":"earthquake","k":[27]},{"src":"us_jobs_report","dst":"equity_market","k":[7]},{"src":"turkey","dst":"assistance","k":[33]},{"src":"gst","dst":"government","k":[28]},{"src":"assistance","dst":"un","k":[4]},{"src":"assistance","dst":"crisis_management","k":[38]},{"src":"us_jobs_report","dst":"u.s.","k":[27]},{"src":"balloon","dst":"weather_surveillance_aircraft","k":[5]},{"src":"balloon","dst":"latin_america","k":[24]},{"src":"us_jobs_report","dst":"eurozone_stock_markets","k":[15]},{"src":"crisis_management","dst":"un","k":[10]},{"src":"bhutan","dst":"india","k":[29]},{"src":"eurozone_stock_markets","dst":"stock_markets","k":[36]}]

india-(33)-green_infrastructure
un-(18)-syria
surveillance-(18)-latin_america
green_debt-(40)-green_bonds
chinese_foreign_ministry-(7)-international_law
u.s.-(26)-equity_market
international_law-(19)-nationalist
emergency_mapping_service-(30)-government
unemployment-(6)-us_jobs_report
ambulance_staff-(15)-inflation
bhutan-(29)-solar_energy_generation
nurses-(11)-inflation
eurozone_stock_markets-(15)-inflation
stock_markets-(47)-investors
beijing-(17)-international_law
green_debt-(21)-green_infrastructure
balloon-(15)-american_plane
balloon-(34)-surveillance
eurozone_stock_markets-(12)-investors
gst-(25)-merger
china-(45)-chinese_foreign_ministry
emergency_mapping_service-(40)-un
stock_markets-(2)-u.s.
fed-(8)-unemployment
india-(44)-sustainable
chinese_foreign_ministry-(18)-nationalist
nurses-(5)-strike
social_media-(28)-american
strike-(33)-inflation
solar_energy_generation-(15)-india
international_law-(35)-american
china-(10)-u.s.
u.s.-(11)-inflation
electricity_imports-(45)-solar_energy_generation
balloon-(6)-beijing
tax_rate-(47)-merger
india-(28)-government
u.s.-(17)-fed
green_debt-(6)-sustainable
ambulance_staff-(37)-strike
chinese_internet-(49)-social_media
himalayan_kingdom-(19)-india
green_debt-(43)-india
china-(32)-chinese_internet
bhutan-(9)-electricity_imports
government-(10)-custom_duty
bhutan-(8)-himalayan_kingdom
custom_duty-(8)-tax_rate
india-(29)-gst
ambulance_staff-(19)-nurses
india-(39)-green_bonds
gst-(1)-custom_duty
international_law-(10)-social_media
south carolina-(31)-balloon
surveillance-(45)-beijing
unemployment-(22)-eurozone_stock_markets
green_infrastructure-(26)-green_bonds
beijing-(4)-china
merger-(17)-custom_duty
beijing-(4)-weather_surveillance_aircraft
merger-(21)-government
equity_market-(1)-fed
india-(29)-tax_rate
stock_markets-(5)-us_jobs_report
government-(1)-tax_rate
china-(8)-american_plane
assistance-(32)-rescue_workers
surveillance-(3)-chinese
emergency_mapping_service-(20)-assistance
merger-(23)-india
emergency_mapping_service-(23)-syria
international_law-(16)-south carolina
inflation-(35)-equity_market
earthquake-(21)-turkey
assistance-(19)-syria
himalayan_kingdom-(23)-solar_energy_generation
syria-(9)-turkey
turkey-(23)-emergency_mapping_service
weather_surveillance_aircraft-(22)-chinese
south carolina-(21)-chinese_internet
chinese_foreign_ministry-(17)-balloon
surveillance-(15)-weather_surveillance_aircraft
inflation-(11)-stock_markets
chinese_foreign_ministry-(30)-american_plane
chinese-(4)-beijing
turkey-(22)-un
turkey-(26)-rescue_workers
rescue_workers-(27)-earthquake
us_jobs_report-(7)-equity_market
turkey-(33)-assistance
gst-(28)-government
assistance-(4)-un
assistance-(38)-crisis_management
us_jobs_report-(27)-u.s.
balloon-(5)-weather_surveillance_aircraft
balloon-(24)-latin_america
us_jobs_report-(15)-eurozone_stock_markets
crisis_management-(10)-un
bhutan-(29)-india
eurozone_stock_markets-(36)-stock_markets
'''