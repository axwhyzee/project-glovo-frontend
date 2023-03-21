import scrapy
import re


class ArticlesSpider(scrapy.Spider):
    name = "cnbc_spider"
    allowed_domains = ["cnbc.com"]
    start_urls = ["http://cnbc.com/technology/", "http://cnbc.com/business/", "http://cnbc.com/politics/"]

    def __init__(self):
        with open('../visited_urls.txt', 'r') as f:
            self.visited = f.read().strip().split('\n')

    def parse(self, response):
        article_links = response.css("div.Card-titleContainer a::attr(href)").getall()
        for link in article_links:
            if link not in self.visited:
                yield scrapy.Request(link, callback= self.parse_articles, meta={'url': link})

    def parse_articles(self,response):
        content=response.css("div.group p::text").extract()
        content = [re.sub(r'<[^>]*>', '', text) for text in content]
        content = [text.strip() for text in content if text.strip()]
        yield {
            "url": response.meta.get('url'),
            "title": response.css("h1.ArticleHeader-headline::text").get(),
            "date": response.css("time::attr(datetime)").get(),
            "content": "\n".join(content)
        }
