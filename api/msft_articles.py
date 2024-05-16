from bs4 import BeautifulSoup
from requests import get


def get_article_info():
    url = "https://news.microsoft.com/source/tag/ai/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"
    }
    response = get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")

        articles = soup.find_all("div", class_="fwpl-row el-8cjrpw")

        for article in articles:
            title_element = article.find("div", class_="fwpl-item el-fz703r h2")
            title = title_element.text.strip()
            link = title_element.find("a")["href"]

            date_element = article.find("div", class_="fwpl-item el-37vm0k7 kicker")
            date = date_element.text.strip()

            print(f"Title: {title}")
            print(f"Link: {link}")
            print(f"Date: {date}")
            print()
    else:
        print("Failed to retrieve the webpage. Status code:", response.status_code)


def main():
    get_article_info()


if __name__ == "__main__":
    main()
