import azure.functions as func
from json import dumps
from .get_articles import get_article_info, get_article_content


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        if req.method == "GET":
            articles_data = get_article_info()
            for article in articles_data:
                article_url = article["link"]
                article_content = get_article_content(article_url)
                article["content"] = article_content

            return func.HttpResponse(
                body=dumps(articles_data), status_code=200, mimetype="application/json"
            )
        else:
            return func.HttpResponse("Invalid request", status_code=400)
    except ValueError:
        return func.HttpResponse("Invalid body", status_code=400)
    except Exception as e:
        return func.HttpResponse(
            dumps({"error": str(e)}), status_code=500, mimetype="application/json"
        )
