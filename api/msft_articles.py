from bs4 import BeautifulSoup
from json import dump, dumps, loads
from requests import get

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"
}


def get_article_info():
    url = "https://news.microsoft.com/source/tag/ai/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"
    }
    response = get(url, headers=headers)

    articles_data = []

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.find_all("div", class_="fwpl-row el-8cjrpw")

        for article in articles:
            title_element = article.find("div", class_="fwpl-item el-fz703r h2")
            title = title_element.text.strip()
            link = title_element.find("a")["href"]

            date_element = article.find("div", class_="fwpl-item el-37vm0k7 kicker")
            date = date_element.text.strip()

            articles_data.append({"title": title, "link": link, "date": date})
    else:
        print("Failed to retrieve the webpage. Status code:", response.status_code)

    return articles_data


def main():
    articles_data = get_article_info()
    for article in articles_data:
        article_url = article["link"]
        article_name = article["title"]
        response = get(article_url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")


if __name__ == "__main__":
    main()
