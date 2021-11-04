import flask
import os, sys, json, random, base64, requests
from dotenv import load_dotenv, find_dotenv
from flask_sqlalchemy import SQLAlchemy

# load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")

bp = flask.Blueprint("bp", __name__, template_folder="./build")


@bp.route("/")
def main():
    print("ENTEREDD MAIN FUNCRTION!!", file=sys.stderr)
    # data = json.dumps()
    return flask.render_template(
        "index.html",
    )


app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8081)),
    )
