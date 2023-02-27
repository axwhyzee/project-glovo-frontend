#!/bin/bash
source venv/bin/activate
cd CNBC
scrapy crawl -o articles_cnbc.json -t json Articles
scrapy crawl -o articles_straits.json -t json straits_spider
scrapy crawl -o articles_yahoo.json -t json yahoo_spider
