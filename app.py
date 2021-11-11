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

    try:
        searched = searchRecipe()
        recipeIds = searched["recipeIds"]
        recipeNames = searched["recipeNames"]
        recipeImgs = searched["recipeImgs"]
        recipeIng = searched["recipeIng"]
        recipeInstr = searched["recipeInstructions"]
    except Exception:
        print("NONE exception", file=sys.stderr)
        recipeIds = [123]
        recipeNames = [""]
        recipeImgs = ["imgurl"]
        print("id: ", recipeIds, file=sys.stderr)

    DATA = {
        "recipeIds": recipeIds,
        "recipeNames": recipeNames,
        "recipeImgs": recipeImgs,
        "recipeIng": recipeIng,
        "recipeInstr": recipeInstr,
    }

    data = json.dumps(DATA)

    return flask.render_template(
        "index.html",
        data=data,
    )


@BP.route("/addRecipe", methods=["POST"])
def searchRecipe():
    """Returns a json of recipe info"""
    try:
        recipe = str(flask.request.json.get("recipe"))
    except Exception:
        recipe = ""
        print("NONEEEE, default values given", file=sys.stderr)

    print("RECIPEEE NAME ", recipe, file=sys.stderr)
    searchResults = Spoon().complex_search(recipe)
    print("SEARCH RESULTS", searchResults, file=sys.stderr)

    recipeIds = []
    recipeNames = []
    recipeImgs = []
    recipeInstructions = []
    recipeIng = []

    for id in range(0, 5):
        recipeIds.append(searchResults["id"][id])
        instructions_ing = Spoon().ingredients_instructions(searchResults["id"][id])
        recipeInstructions.append(instructions_ing["instructions"])
        recipeIng.append(instructions_ing["ingredients"])
        recipeNames.append(searchResults["title"][id])
        recipeImgs.append(searchResults["image"][id])

    recipeInfo = {
        "recipeIds": recipeIds,
        "recipeNames": recipeNames,
        "recipeImgs": recipeImgs,
        "recipeInstructions": recipeInstructions,
        "recipeIng": recipeIng,
    }

    flask.jsonify({"recipeNames": recipeNames})
    flask.jsonify({"recipeImgs": recipeImgs})
    flask.jsonify({"recipeIds": recipeImgs})
    flask.jsonify({"recipeInstructions": recipeInstructions})
    flask.jsonify({"recipeIng": recipeIng})

    return recipeInfo


APP.register_blueprint(BP)

if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8081"),
    )
