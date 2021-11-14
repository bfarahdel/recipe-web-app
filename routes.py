"""

This file has all the route definitions

"""
from vars import APP
from vars import db
from vars import bcrypt
import flask
from flask import redirect, url_for
from flask_login import login_user, current_user, login_required, logout_user
from models import Recipe, User
import sys
import json
from spoon import Spoon

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


@APP.route("/signup")
def signup():
    return flask.render_template("signup.html")


@APP.route("/signup", methods=["POST"])
def signup_post():
    email = flask.request.form.get("email")
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")
    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User.query.filter_by(username=username).first()
    if user:
        pass
    else:
        user = User(username=username, password=pw_hash, email=email)
        db.session.add(user)
        db.session.commit()

    return flask.redirect(flask.url_for("login"))


@APP.route("/login", methods=["POST"])
def login_post():
    email = flask.request.form.get("email")
    password = flask.request.form.get("password")

    user = User.query.filter_by(email=email).first()

    if user:
        is_correct_password = bcrypt.check_password_hash(user.password, password)
        if is_correct_password:
            login_user(user)
            return flask.redirect(flask.url_for("bp.main"))
        return flask.jsonify({"status": 401, "reason": "Email or Password Error"})
    else:
        return flask.jsonify({"status": 401, "reason": "Email or Password Error"})


@APP.route("/login")
def login():
    return flask.render_template("login.html")


@APP.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("login"))
