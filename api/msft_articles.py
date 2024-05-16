from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
from bs4 import BeautifulSoup
from json import dumps
from openai import AzureOpenAI
from requests import get

vault_url = "https://kv-velosio.vault.azure.net/"
credential = DefaultAzureCredential()
secret_client = SecretClient(vault_url=vault_url, credential=credential)
endpoint = secret_client.get_secret("AOAIEndpoint").value
api_key = secret_client.get_secret("AOAIKey").value
deployment = secret_client.get_secret("AOAIDeploymentId3").value

client = AzureOpenAI(
    api_version="2023-07-01-preview",
    azure_endpoint=endpoint,
    api_key=api_key,
)

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


def gen_article_summary(article_title, article_content=""):
    system_message = (
        "Given the HTML content of an article, "
        + "provide a one to two sentence summary. "
        + "If the HTML content is not provided, "
        + "summarize the article based on its title."
    )

    messages = [{"role": "system", "content": system_message}]
    user_message_content = "TITLE: " + article_title + "\n" + article_content
    user_message = {"role": "user", "content": user_message_content}
    messages.append(user_message)

    completion = client.chat.completions.create(
        model=deployment,
        messages=messages,
    )

    response = completion.choices[0].message.content
    return response


def gen_article_categories(articles_data):
    system_message = (
        "Given JSON information about articles, "
        + "categorize each article into one of two to four categories, "
        + "based on the type of article it is. For example, possible categories "
        + "could be Product Updates, Success Story, or Company News. "
        + "Respond in JSON format with the article title and category."
    )

    messages = [{"role": "system", "content": system_message}]
    user_message_content = dumps(articles_data, indent=2)
    user_message = {"role": "user", "content": user_message_content}
    messages.append(user_message)

    completion = client.chat.completions.create(
        model=deployment,
        messages=messages,
        response_format={"type": "json_object"},
    )

    response = completion.choices[0].message.content
    return response


def main():
    articles_data = get_article_info()

    for article in articles_data:
        article_url = article["link"]
        article_name = article["title"]
        article_content = get_article_content(article_url)
        article_summary = gen_article_summary(article_name, article_content)
        article["summary"] = article_summary

    article_categories = gen_article_categories(articles_data)
    print(article_categories)


if __name__ == "__main__":
    main()
