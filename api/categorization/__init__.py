import azure.functions as func
from json import dumps
from .gen_categories import gen_article_categories


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        req_body = req.get_json()
        articles_data = req_body.get("articles", [])

        if req.method == "POST":
            categories = gen_article_categories(articles_data)
            return func.HttpResponse(
                body=dumps({"categories": categories}),
                status_code=200,
                mimetype="application/json",
            )
        else:
            return func.HttpResponse("Invalid request", status_code=400)
    except ValueError:
        return func.HttpResponse("Invalid body", status_code=400)
    except Exception as e:
        return func.HttpResponse(
            dumps({"error": str(e)}), status_code=500, mimetype="application/json"
        )
