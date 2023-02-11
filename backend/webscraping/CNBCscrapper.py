import requests
from bs4 import BeautifulSoup
import json
genre= ['business', 'technology', 'politics']
URLS ={}
for i in genre:
    URL= f"https://www.cnbc.com/{i}/"
    r = requests.get(URL)
    soup = BeautifulSoup(r.content, 'html5lib')
    cardtitle = soup.findAll('div', attrs = {"class":"Card-titleContainer"})
    URLS[i]=[]
    limit=0
    for each in cardtitle:
        if(limit==7):
            break
        print(each.a['href'])
        URLS[i].append(each.a['href'])
        limit+=1


data=[]
article={}

for i in genre:
    for url in URLS[i]:
        article={}
        r = requests.get(url)
        soup = BeautifulSoup(r.content, 'html5lib')
        table = soup.findAll('div', attrs = {'class':'group'})
        headline= soup.find('h1')
        body=""
        for row in table:
            paras=[]
            for each in row.findAll('p'):
                if("WATCH: " not in each.text):
                    paras.append(each.text.encode("ascii", "ignore").decode())

            body+= ' '.join(paras)


        article['url']=url
        article['topic']= i
        article['headline']= headline.text
        article['content']= body
        data.append(article)


final = json.dumps(data, indent=2)
with open("cnbcglovo.json", "w") as outfile:
    outfile.write(final)

