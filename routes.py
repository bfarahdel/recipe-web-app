"""

This file has all the route definitions

"""
import sys
import json
import flask
from flask import request
from flask import redirect, url_for, flash, render_template
from flask_login import login_user, current_user, logout_user
from vars import APP
from vars import db
from vars import bcrypt
from models import Recipe, User
from spoon import Spoon
from forms import RegistrationForm, LoginForm
from validations import Validation

BP = flask.Blueprint("bp", __name__, template_folder="./build")


@BP.route("/", methods=["GET", "POST"])
def main():
    """Loads main index.html page"""

    print("ENTEREDD MAIN FUNCRTION!!", file=sys.stderr)

    if current_user.is_authenticated:

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

    print("User not logged in")
    return flask.redirect(flask.url_for("login_post"))


@BP.route("/add_recipe", methods=["GET", "POST"])
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


@APP.route("/fav_list", methods=["GET", "POST"])
def fav_list():
    fav_recipes = flask.request.json.get("recipeList")
    print("RECIPE LIST FAV ", fav_recipes, file=sys.stderr)
    recipes = {
        "fav_recipes": fav_recipes,
    }

    if len(fav_recipes) > 0:
        for data in fav_recipes:
            x = Recipe.query.filter_by(
                username=current_user.username, recipe_name=data
            ).first()
            if x:
                pass
            else:
                db.session.add(
                    Recipe(
                        username=current_user.username,
                        json_field=fav_recipes,
                        recipe_name=data,
                    )
                )
                db.session.commit()

    return recipes


@APP.route("/signup", methods=["GET", "POST"])
def signup_post():
    """This function deals with sign_up page"""
    if current_user.is_authenticated:
        return redirect(url_for("bp.main"))
    form = RegistrationForm()

    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            password=bcrypt.generate_password_hash(form.password.data).decode("utf-8"),
        )
        db.session.add(user)  # pylint: disable=E1101
        db.session.commit()  # pylint: disable=E1101
        flash("Your account is now created and you can log in below", "success")
        return redirect(url_for("login_post"))

    username_from_form = form.username.data
    email_from_form = form.email.data

    if username_from_form is not None and email_from_form is not None:
        u_name = Validation(True)
        e_mail = Validation(True)
        print("Username validation: ", u_name.validation_username(username_from_form))
        print("Email validation: ", e_mail.validation_email(email_from_form))

    return render_template("signup.html", form=form)


@APP.route("/login", methods=["GET", "POST"])
def login_post():
    """This function deals with login page"""
    if current_user.is_authenticated:
        return redirect(url_for("bp.main"))
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(  # pylint: disable=E1101
            email=form.email.data
        ).first()
        if user:
            is_correct_password = bcrypt.check_password_hash(
                user.password, form.password.data
            )
            if is_correct_password:
                login_user(user)
                return redirect(url_for("bp.main"))

            flash("Incorrect password", "error")

        else:
            flash("User does not exist", "error")

    return render_template("login.html", form=form)


@APP.route("/logout")
def logout():
    """This function deals with logging out"""
    logout_user()
    return redirect(url_for("login_post"))
