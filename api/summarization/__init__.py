import azure.functions as func
from json import dumps
from .gen_summaries import gen_article_slug, gen_article_summary


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        req_body = req.get_json()
        article_title = req_body.get("title", "")
        article_content = req_body.get("content", "")

        if req.method == "POST":
            slug = gen_article_slug(article_title)
            summary = gen_article_summary(article_title, article_content)
            return func.HttpResponse(
                body=dumps({"slug": slug, "summary": summary}),
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
