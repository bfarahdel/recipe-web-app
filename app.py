"""Initializes and provides routing for the app"""
import os
import sys
import json
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

    searched = search_recipe()
    recipe_ids = searched["recipe_ids"]
    recipe_names = searched["recipe_names"]
    recipe_imgs = searched["recipe_imgs"]
    recipe_ing = searched["recipe_ing"]
    recipe_instr = searched["recipe_instructions"]

    data_info = {
        "recipeIds": recipe_ids,
        "recipeNames": recipe_names,
        "recipeImgs": recipe_imgs,
        "recipeIng": recipe_ing,
        "recipeInstr": recipe_instr,
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

    for index in range(0, 5):
        recipe_ids.append(search_results["id"][index])
        instructions_ing = Spoon().ingredients_instructions(search_results["id"][index])
        recipe_instructions.append(instructions_ing["instructions"])
        recipe_ing.append(instructions_ing["ingredients"])
        recipe_names.append(search_results["title"][index])
        recipe_imgs.append(search_results["image"][index])

    recipe_info = {
        "recipe_ids": recipe_ids,
        "recipe_names": recipe_names,
        "recipe_imgs": recipe_imgs,
        "recipe_instructions": recipe_instructions,
        "recipe_ing": recipe_ing,
    }

    flask.jsonify({"recipe_names": recipe_names})
    flask.jsonify({"recipe_imgs": recipe_imgs})
    flask.jsonify({"recipe_ids": recipe_ids})
    flask.jsonify({"recipe_instructions": recipe_instructions})
    flask.jsonify({"recipe_ing": recipe_ing})

    return recipe_info


APP.register_blueprint(BP)

if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8081"),
    )
