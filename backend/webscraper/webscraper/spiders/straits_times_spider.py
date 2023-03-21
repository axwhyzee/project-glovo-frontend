import scrapy
import re


class StraitsTimesSpiderSpider(scrapy.Spider):
    name = "straits_times_spider"
    allowed_domains = ["straitstimes.com"]
    start_urls = ["http://straitstimes.com/breaking-news"]
    user_agent = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}

    def __init__(self):
        with open('../visited_urls.txt', 'r') as f:
            self.visited = f.read().strip().split('\n')

    def parse(self, response):
        article_links = response.css("h5.card-title a::attr(href)").getall()
        for link in article_links:
            if "/multimedia/" in link:
                continue
            link= 'http://www.straitstimes.com'+link

            if link not in self.visited:
                yield scrapy.Request(link, callback=self.parse_article, meta={'url': link})
        pass

    def parse_article(self, response):
        content=response.css("div.ds-field-item p::text").extract()
        content = [re.sub(r'<[^>]*>', '', text) for text in content]
        content = [text.strip() for text in content if text.strip()]
        content= "\n".join(content)
        content = content[:content.find("Join ST")]
        result = response.css("meta").getall()
        date=""
        for i in result:
            if "article:published_time" in i:
                date= i[49:-2]
        yield {
            "url": response.meta.get('url'),
            "title": response.css("h1.headline::text").get().strip(),
            "date": date,
            "content": content
        }


