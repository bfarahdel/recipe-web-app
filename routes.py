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

BP = flask.Blueprint("bp", __name__, template_folder="./build")


@BP.route("/")
def main():
    """Loads main index.html page"""
    print("ENTEREDD MAIN FUNCRTION!!", file=sys.stderr)

    if current_user.is_authenticated:
        return flask.render_template(
            "index.html",
        )
    return flask.redirect(flask.url_for("login"))


APP.register_blueprint(BP)


@APP.route("/signup")
def signup():
    return flask.render_template("signup.html")


@APP.route("/signup", methods=["POST"])
def signup_post():
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")
    pw_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User.query.filter_by(username=username).first()
    if user:
        pass
    else:
        user = User(username=username, password=pw_hash)
        db.session.add(user)
        db.session.commit()

    return flask.redirect(flask.url_for("login"))


@APP.route("/login", methods=["POST"])
def login_post():
    username = flask.request.form.get("username")
    password = flask.request.form.get("password")

    user = User.query.filter_by(username=username).first()

    if user:
        is_correct_password = bcrypt.check_password_hash(user.password, password)
        if is_correct_password:
            login_user(user)
            return flask.redirect(flask.url_for("bp.main"))
        return flask.jsonify({"status": 401, "reason": "Username or Password Error"})
    else:
        return flask.jsonify({"status": 401, "reason": "Username or Password Error"})


@APP.route("/login")
def login():
    return flask.render_template("login.html")


@APP.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("login"))
