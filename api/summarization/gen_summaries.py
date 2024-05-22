from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
from openai import OpenAI

vault_url = "https://kv-galwort.vault.azure.net/"
credential = DefaultAzureCredential()
secret_client = SecretClient(vault_url=vault_url, credential=credential)
client = OpenAI(api_key=secret_client.get_secret("OAIKey").value)


def gen_article_slug(article_title):
    system_message = (
        "Given the title of an article, "
        + "generate a new, shorter title, "
        + "that summarizes the title with "
        + "a maximum of 5 words."
    )

    messages = [{"role": "system", "content": system_message}]
    user_message_content = article_title
    user_message = {"role": "user", "content": user_message_content}
    messages.append(user_message)

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=7,
    )

    return response.choices[0].message.content


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

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
    )

    return response.choices[0].message.content
