from requests import get
from bs4 import BeautifulSoup

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"
}


def get_article_info():
    url = "https://news.microsoft.com/source/tag/ai/"
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


def get_article_content(article_url):
    classes = ["entry-content m-blog-content", "post__content", "single__content"]
    article_content = ""
    response = get(article_url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

        article_id_div = soup.find("div", id="blog-post-content")
        if article_id_div:
            article_content = article_content + str(
                soup.find("div", id="blog-post-content")
            )

        for class_text in classes:
            article_div = soup.find("div", class_=class_text)
            if article_div:
                article_content = article_content + str(article_div)
    else:
        print("Failed to retrieve the webpage. Status code:", response.status_code)

    return article_content
