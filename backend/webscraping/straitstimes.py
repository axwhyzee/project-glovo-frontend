import json
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.straitstimes.com"
BREAKING_NEWS_URL = 'https://www.straitstimes.com/breaking-news'


def getURL(a: str):
    href = a[10:str.find(a, "hreflang") - 2]
    return BASE_URL + href


def getNameDateMain(detailed_article: BeautifulSoup) -> (str, str):
    try:
        # get the text of the data dictionary form the html code
        data = detailed_article.find_all("script")[7].text

        # get the name of the article by searching for the start index of the header
        name = data[str.find(data, "title_ga"):]
        name = name[str.find(name, ": \"") + 3:str.find(name, "\",")]

        # get the published date of the article by searching for the start index of the header
        pubdate = data[str.find(data, "pubdate"):]
        pubdate = pubdate[str.find(pubdate, ": \"") + 3:str.find(pubdate, "\",")]

        # return the name and published date, stripped of white space characters
        return name.strip(), pubdate.strip()
    except IndexError:

        # use the backup method to get name and date
        return getNameDateBackup(detailed_article)


def getNameDateBackup(detailed_article: BeautifulSoup) -> (str, str):
    try:
        # get the @graph dictionary from the html code
        graph_dict = json.loads(detailed_article.find("script", type="application/ld+json").text)

        # get the name from the headline keyword of the dictionary
        name = graph_dict['@graph'][0]['headline'].encode("ascii", "ignore").decode()

        # get the published date from the datePublished keyword of the dictionary
        pubdate = graph_dict['@graph'][0]['datePublished']

        # return the name and date
        return name, pubdate

    except Exception:
        # unable to find name, date, return None
        return None, None


def getArticleContent(detailed_article: BeautifulSoup) -> str:
    # an array of the sentences in the content
    story_array = [line.text for line in detailed_article.find_all("p")]

    # joining the sentences with a whitespace inbetween
    story = " ".join(story_array)

    # removing unwanted Straits Times Text
    story = story[: str.find(story, "Join ST")]
    story = story[: str.find(story, "Already a subscriber")]

    # returning the story after removing unwanted unicode values from the text
    return story.encode("ascii", "ignore").decode()


def main():
    # list of json objects
    json_data = []

    # headers to fool the website into thinking the program is a person
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}

    # request for the breaking news page
    raw_breaking_news_page = requests.get(BREAKING_NEWS_URL, headers=headers)

    # create a beautiful soup instance with the html of the breaking news page
    breaking_news_page = BeautifulSoup(raw_breaking_news_page.text, 'html.parser')

    # form a list of articles
    card_list = breaking_news_page.find_all('div', {'class': 'card-body'})

    # open the file to store the data
    with open('glovoStraitsTimes.json', 'w') as file:

        # iterate through the articles
        for card_body in card_list:

            # finding the Url of the news article
            url = getURL(str(card_body.select("a")))

            #  disclude the morning briefing page
            if url[
               :-12] == "https://www.straitstimes.com/singapore/morning-briefing-top-stories-from-the-straits-times-on":
                continue

            # sending a request for the article's html page
            raw_breaking_news_page = requests.get(url, headers=headers)

            # creating a beautiful soup instance with the obtained html code
            article_html = BeautifulSoup(raw_breaking_news_page.text, 'html.parser')

            # get the content of the article
            story = getArticleContent(article_html)

            # get the title and date published of the article
            title, date_published = getNameDateMain(article_html)
            # if the title was not found discard article
            if title is None:
                continue
            # if only date was not found, set date to "Not Available"
            if date_published is None:
                date_published = "Not Available"

            # set publisher to Straits Times
            publisher = "Straits Times"

            # create a dictionary form the article's data and append it into the list of dictionaries
            output_dict = {"URL": url, "Title": title, "Publisher": publisher, "Date": date_published, "Content": story}
            json_data.append(output_dict)

        # convert the list of dictionaries to a string and write it into the file
        output = json.dumps(json_data)
        file.write(output)
        file.close()


if __name__ == '__main__':
    main()
