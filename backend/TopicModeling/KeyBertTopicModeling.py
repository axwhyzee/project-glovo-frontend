import json
from keyphrase_vectorizers import KeyphraseCountVectorizer
import spacy
import plotly.io as pio
pio.renderers.default = "browser"
from bertopic import BERTopic
import gensim
from gensim import corpora
from gensim.models.ldamodel import LdaModel
from gensim.models import HdpModel
from gensim.models import CoherenceModel
from gensim.utils import simple_preprocess
from gensim.corpora.dictionary import Dictionary
from nltk.corpus import stopwords
spacy.load('en_core_web_sm')

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
for article in data:
    predata.append(article.lower())


from bertopic import BERTopic
from sklearn.feature_extraction.text import CountVectorizer

vectorizer_model = CountVectorizer(ngram_range=(1, 2), stop_words=stop_words)
model = BERTopic(
    vectorizer_model=vectorizer_model,
    language='english', calculate_probabilities=True,
    verbose=True, nr_topics=30, top_n_words=10,
)
topics, probs = model.fit_transform(data)

freq = model.get_topic_info()
print(freq.head(20))

topicst = model.get_topics()

for topic_id in topicst:
    keywords = topicst[topic_id]
    print(f"Topic {topic_id}: {keywords}")

fig=model.visualize_barchart()
fig.show()
model.get_params()

fig=model.visualize_topics()
fig.show()
