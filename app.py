import os, sys
import flask
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = flask.Flask(__name__, static_folder="./build/static")


bp = flask.Blueprint("bp", __name__, template_folder="./build")


@bp.route("/")
def main():
    print("ENTERED MAIN FUNCTION!!", file=sys.stderr)
    return flask.render_template(
        "index.html",
    )


app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8081)),
    )
