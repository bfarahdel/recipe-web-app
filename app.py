"""Initializes and provides routing for the app"""
import os
import sys
import flask
import json
from dotenv import load_dotenv, find_dotenv
from spoon import Spoon

load_dotenv(find_dotenv())

APP = flask.Flask(__name__, static_folder="./build/static")

BP = flask.Blueprint("bp", __name__, template_folder="./build")


@BP.route("/")
def main():
    """Loads main index.html page"""
    print("ENTEREDD MAIN FUNCRTION!!", file=sys.stderr)
    # (recipeNames, recipeImgs) = searchRecipe()

    # DATA = {
    #     "recipeNames": recipeNames,
    #     "recipeImgs": recipeImgs
    # }
    # data = json.dumps(DATA)
    return flask.render_template(
        "index.html",
        # data=data,
    )


@BP.route("/addRecipe", methods=["POST"])
def searchRecipe():
    """Returns a list of recipe names"""

    recipe = str(flask.request.json.get("recipeName"))
    print("RECIPEEE NAMEEEE ", recipe, file=sys.stderr)
    searchResults = Spoon().complex_search(recipe)
    print("SEARCH RESULTS", searchResults, file=sys.stderr)
    recipeNames = []
    recipeImg = []
    for title in range(0, 5):
        recipeNames.append(searchResults["title"][title])

    for img in range(0, 5):
        recipeImg.append(searchResults["image"][img])

    print("TOP 5 RECIPES", recipeNames, file=sys.stderr)
    print("TOP 5 IMG URL", recipeImg, file=sys.stderr)

    return (recipeNames, recipeImg)


APP.register_blueprint(BP)

if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8081"),
    )
