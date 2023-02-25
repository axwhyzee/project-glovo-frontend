from keybert import KeyBERT
import json
from sentence_transformers import SentenceTransformer
import numpy as np


def getArticles():
    with open('data.json', 'r') as file:
        return json.load(file)


def writeFile(data: str):
    with open('keyword.json', 'w') as file:
        file.write(data)


def extractKeywords(data: str) -> list:
    model = KeyBERT()
    try:
        doc_embeddings, word_embeddings = model.extract_embeddings(data, min_df=1, stop_words="english",
                                                                   keyphrase_ngram_range=(1, 2))
        keywords = model.extract_keywords(data, min_df=1, stop_words="english",
                                          doc_embeddings=doc_embeddings,
                                          word_embeddings=word_embeddings, keyphrase_ngram_range=(1, 2), use_mmr=True,
                                          diversity=0.7, top_n=10, nr_candidates=20)
    except ValueError:
        return None, None
    return keywords, word_embeddings


def getPhraseEmbeddings(phrase: str, content_words: list[str], phrase_embeddings) -> list:
    try:
        index = content_words.index(phrase.split()[0])
    except ValueError:
        return None
    embedding = phrase_embeddings[index: index + len(phrase.split())].tolist()
    if len(embedding) == 0:
        return None
    avg_embedding = np.average(embedding, axis=0).tolist()
    return avg_embedding


article_list = []
# get the list of articles from the json file
json_data = getArticles()

for article in json_data:
    # get the content of the article, without caps
    content = article['Content'].lower()

    # extract the keywords from the content
    keyphrases, embeddings = extractKeywords(content)
    if keyphrases is None:
        continue

    words = [keyword[0] for keyword in keyphrases]
    word_embeddings_list = []
    # iterate through the list of keywords
    for i in range(len(words)):
        # get the current phrase
        word = words[i]
        # split the content by space character into a list of words
        article_words = content.split()
        # get the average embedding of the phrase
        phrase_embedding = getPhraseEmbeddings(word, article_words, embeddings)
        if phrase_embedding is None:
            continue
        # create a dictionary of the phrase, similarity and average embedding
        word_dict = {"phrase": word, "similarity": keyphrases[i][1], "vectors": phrase_embedding}
        # append the dictionary to the list of keywords
        word_embeddings_list.append(word_dict)

    # add the list of keywords to the article's dictionary
    article = dict(article)
    article['keywords'] = word_embeddings_list
    article_list.append(article)

# write the list of articles to a json file
articles_str = json.dumps(article_list)
writeFile(articles_str)
