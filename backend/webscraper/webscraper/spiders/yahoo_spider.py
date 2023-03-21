import scrapy
import re


class YahooSpiderSpider(scrapy.Spider):
    name = "yahoo_spider"
    allowed_domains = ["news.yahoo.com"]
    start_urls = ["http://news.yahoo.com/"]

    def __init__(self):
        with open('../visited_urls.txt', 'r') as f:
            self.visited = f.read().strip().split('\n')

    def parse(self, response):
        article_links = response.css("h3 a::attr(href)").getall()
        for link in article_links:
            link= 'http://news.yahoo.com/'+link

            if link not in self.visited:
                yield scrapy.Request(link, callback=self.parse_article, meta={'url': link})
        pass

    def parse_article(self, response):
        content=response.css("article p::text").extract()
        content = [re.sub(r'<[^>]*>', '', text) for text in content]
        content = [text.strip() for text in content if text.strip()]
        if len(content)!=0:
            yield {
            "url": response.meta.get('url'),
            "title": response.css("article h1::text").get(),
            "date": response.css("article time::attr(datetime)").get(),
            "content": "\n".join(content)
        }

