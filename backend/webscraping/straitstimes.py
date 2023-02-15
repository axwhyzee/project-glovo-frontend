import requests
from bs4 import BeautifulSoup
import json


def getHref(a: str):
    return a[10:str.find(a, "hreflang") - 2]

if __name__ == '__main__':
    breaking_news_url = 'https://www.straitstimes.com/breaking-news'
    base_url = 'https://www.straitstimes.com'
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}
    raw_breaking_news_page = requests.get(breaking_news_url, headers=headers)
    breaking_news_page = BeautifulSoup(raw_breaking_news_page.text, 'html.parser')
    card_list = breaking_news_page.find_all('div', {'class': 'card-body'})
    with open('straitstimes.json', 'w') as file:
        file.write("[\n")
        for card_body in card_list:
            url = base_url + getHref(str(card_body.select("a")))
            raw_breaking_news_page = requests.get(url, headers=headers)
            article_html = BeautifulSoup(raw_breaking_news_page.text, 'html.parser')
            story = " ".join(line.text for line in article_html.find_all("p")).encode("ascii", "ignore").decode()
            story = story[:str.find(story, "Join ST")]
            info_dict = json.loads(article_html.find("script", type="application/ld+json").text)
            title = info_dict['@graph'][0]['headline'].encode("ascii", "ignore").decode()
            date_published = info_dict['@graph'][0]['datePublished']
            date_published = "-".join([date_published[8:10], date_published[5:7], date_published[:4]])
            publisher = "Straits Times"
            output_dict = {"URL": url, "Title": title, "Publisher": publisher, "Date": date_published, "Content": story}
            json.dump(output_dict, file)
            if card_body != card_list[-1]:
                file.write(", \n")
        file.write("]\n")
        file.close()
