from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
from json import dumps, loads
from openai import OpenAI

vault_url = "https://kv-galwort.vault.azure.net/"
credential = DefaultAzureCredential()
secret_client = SecretClient(vault_url=vault_url, credential=credential)
client = OpenAI(api_key=secret_client.get_secret("OAIKey").value)


def gen_article_categories(articles_data):
    system_message = (
        "Given JSON information about articles, "
        + "categorize each article into one of two to four categories, "
        + "based on the type of article it is. For example, possible categories "
        + "could be Product Updates, Success Story, or Company News. "
        + "Respond in JSON format with the article title and category, "
        + "using 'title' and 'category' as their respective keys. "
        + "Use 'articles' as the overall key."
    )

    messages = [{"role": "system", "content": system_message}]
    user_message_content = dumps(articles_data, indent=2)
    user_message = {"role": "user", "content": user_message_content}
    messages.append(user_message)

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        response_format={"type": "json_object"},
    )

    response_json = loads(response.choices[0].message.content)
    article_categories = response_json["articles"]
    return article_categories
