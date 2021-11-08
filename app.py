"""Initializes and provides routing for the app"""
import os
import sys
import flask
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

APP = flask.Flask(__name__, static_folder="./build/static")

BP = flask.Blueprint("bp", __name__, template_folder="./build")


@BP.route("/")
def main():
    """Loads main index.html page"""
    print("ENTEREDD MAIN FUNCRTION!!", file=sys.stderr)
    return flask.render_template(
        "index.html",
    )


APP.register_blueprint(BP)

if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8081"),
    )
