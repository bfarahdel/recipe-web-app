"""Initializes and provides routing for the app"""
import os
import json
import sys
import flask
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
        searched = search_recipe()
        recipe_ids = searched["recipe_ids"]
        recipe_names = searched["recipe_names"]
        recipe_imgs = searched["recipe_imgs"]
        recipe_ing = searched["recipe_ing"]
        recipe_instr = searched["recipe_instructions"]
    except Exception:  # pylint: disable=broad-except
        print("NONE exception", file=sys.stderr)
        recipe_ids = [123]
        recipe_names = [""]
        recipe_imgs = ["imgurl"]
        print("id: ", recipe_ids, file=sys.stderr)

    data_info = {
        "recipe_ids": recipe_ids,
        "recipe_names": recipe_names,
        "recipe_imgs": recipe_imgs,
        "recipe_ing": recipe_ing,
        "recipe_instr": recipe_instr,
    }

    data = json.dumps(data_info)

    return flask.render_template(
        "index.html",
        data=data,
    )


@BP.route("/add_recipe", methods=["POST"])
def search_recipe():
    """Returns a json of recipe info"""
    try:
        recipe = str(flask.request.json.get("recipe"))
    except Exception:  # pylint: disable=broad-except
        recipe = ""
        print("NONEEEE, default values given", file=sys.stderr)

    print("RECIPEEE NAME ", recipe, file=sys.stderr)
    search_results = Spoon().complex_search(recipe)
    print("SEARCH RESULTS", search_results, file=sys.stderr)

    recipe_ids = []
    recipe_names = []
    recipe_imgs = []
    recipe_instructions = []
    recipe_ing = []

    for recipe in range(0, 5):
        recipe_ids.append(search_results["id"][recipe])
        instructions_ing = Spoon().ingredients_instructions(
            search_results["id"][recipe]
        )
        recipe_instructions.append(instructions_ing["instructions"])
        recipe_ing.append(instructions_ing["ingredients"])
        recipe_names.append(search_results["title"][recipe])
        recipe_imgs.append(search_results["image"][recipe])

    recipe_info = {
        "recipe_ids": recipe_ids,
        "recipe_names": recipe_names,
        "recipe_imgs": recipe_imgs,
        "recipe_instructions": recipe_instructions,
        "recipe_ing": recipe_ing,
    }

    flask.jsonify({"recipe_names": recipe_names})
    flask.jsonify({"recipe_imgs": recipe_imgs})
    flask.jsonify({"recipe_ids": recipe_imgs})
    flask.jsonify({"recipe_instructions": recipe_instructions})
    flask.jsonify({"recipe_ing": recipe_ing})

    return recipe_info


APP.register_blueprint(BP)

if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8081"),
    )
