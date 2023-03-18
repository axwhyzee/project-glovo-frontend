import json
from keyphrase_vectorizers import KeyphraseCountVectorizer
import spacy
import plotly.io as pio
pio.renderers.default = "browser"
from gensim.models import HdpModel
import gensim
from gensim import corpora
from gensim.models.ldamodel import LdaModel
from gensim.utils import simple_preprocess
from nltk.corpus import stopwords
with open('articles_cnbc.json') as f:
    data = json.load(f)

contdata=[]
for i in data:
    contdata.append(i['content'])


with open('articles_straits.json') as f:
    data = json.load(f)
for i in data:
    contdata.append(i['content'])



with open('articles_yahoo.json') as f:
    data = json.load(f)
for i in data:
    contdata.append(i['content'])

# Init default vectorizer.
predata=[]
data= contdata
stopwordspotential= ['said', 'also', 'would', 'could', 'told', 'since', 'get']

stop_words = stopwords.words('english')
stop_words= stop_words+ stopwordspotential

data = contdata
processed_data = []
for article in data:
    processed_article = simple_preprocess(article, deacc=True)
    processed_article = [word for word in processed_article if word not in stop_words]
    processed_data.append(processed_article)

dictionary = corpora.Dictionary(processed_data)
bow_corpus = [dictionary.doc2bow(doc) for doc in processed_data]
hdp_model = HdpModel(bow_corpus, id2word=dictionary)
hdp_topics = hdp_model.show_topics()
topic_info = hdp_model.print_topics(num_topics=15, num_words=20)

for idx, topic in topic_info:
    print(f'Topic: {idx} \nWords: {topic}\n')
