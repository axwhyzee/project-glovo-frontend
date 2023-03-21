import json
import numpy as np
from keybert import KeyBERT
from keyphrase_vectorizers import KeyphraseCountVectorizer


def getArticles():
    with open('data.json', 'r') as file:
        return json.load(file)


def writeFile(data: str):
    with open('keyword.json', 'w') as file:
        file.write(data)


def extractKeywords(data: str, heading: str) -> list:
    model = KeyBERT()
    vectorizer = KeyphraseCountVectorizer()
    heading_words = [heading_keyword[0] for heading_keyword in
                     model.extract_keywords(heading, min_df=1, stop_words="english", vectorizer=vectorizer)]
    try:
        doc_embeddings, word_embeddings = model.extract_embeddings(data, stop_words="english")

        keywords = model.extract_keywords(data, stop_words="english", seed_keywords=heading_words, top_n=5,
                                          nr_candidates=10, diversity=.8, vectorizer=vectorizer, use_maxsum=True)

    except ValueError:
        return None, None

    return keywords, word_embeddings, doc_embeddings


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


def get_cosine_similarity(a, b):
    numerator = np.dot(a, b.transpose())

    a_norm = np.sqrt(np.sum(a ** 2))
    b_norm = np.sqrt(np.sum(b ** 2))

    denominator = a_norm * b_norm

    cosine_similarity = numerator / denominator

    # print(cosine_similarity)
    return cosine_similarity[0][0]


article_list = []
# get the list of articles from the json file
json_data = getArticles()

word_embeddings_list = []

for article in json_data[:25]:
    # get the content of the article, without caps
    content = article['Content'].lower()

    # extract the keywords from the content
    keyphrases, embeddings, doc_e = extractKeywords(content, article['Title'].lower())

    if keyphrases is None:
        continue

    words = [keyword[0] for keyword in keyphrases]

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

        word_embeddings_list.append([word, phrase_embedding])

        # create a dictionary of the phrase, similarity and average embedding
        word_dict = {"phrase": word, "similarity": keyphrases[i][1], "vectors": phrase_embedding}
        # append the dictionary to the list of keywords
    #
    # add the list of keywords to the article's dictionary
    article = dict(article)
    article['keywords'] = word_embeddings_list
    article_list.append(article)

# write the list of articles to a json file
articles_str = json.dumps(article_list)
writeFile(articles_str)

for i in range(len(word_embeddings_list)):
    for j in range(i + 1, len(word_embeddings_list)):
        output = round(get_cosine_similarity(np.asarray(word_embeddings_list[i][1]),
                                             np.asarray(word_embeddings_list[j][1])) * 100, 1)
        if output > 60:
            print("{} and {} are {}% similar".format(word_embeddings_list[i][0],
                                                     word_embeddings_list[j][0], output))
