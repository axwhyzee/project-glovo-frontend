import json
from keyphrase_vectorizers import KeyphraseCountVectorizer
import spacy
import plotly.io as pio
pio.renderers.default = "browser"
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
num_topics = 10
lda_model = LdaModel(bow_corpus, num_topics=num_topics, id2word=dictionary, passes=20, alpha=0.1, eta=0.01)

for idx, topic in lda_model.print_topics(num_topics=num_topics, num_words=20):
    print(f'Topic: {idx} \nWords: {topic}\n')
