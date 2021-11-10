"""Initializes and provides routing for the APP"""
import os
import sys
import flask
from flask import redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
from dotenv import load_dotenv, find_dotenv
from flask_bcrypt import Bcrypt

load_dotenv(find_dotenv())

APP = flask.Flask(__name__, static_folder="./build/static")

BP = flask.Blueprint("bp", __name__, template_folder="./build")

APP.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
APP.secret_key = b"I am a secret key!"

db = SQLAlchemy(APP)
bcrypt = Bcrypt(APP)

login_manager = LoginManager(APP)
login_manager.login_view = "login_page"


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


@login_manager.user_loader
def load_user(user_name):
    return User.query.get(user_name)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(120))

    def __repr__(self):
        return f"User('{self.username}', '{self.password}')"

    def get_username(self):
        return self.username


class Artist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"<Artist {self.artist_id}>"


db.create_all()


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


@APP.route("/login")
def login():
    return flask.render_template("login.html")


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
        else:
            return flask.jsonify(
                {"status": 401, "reason": "Username or Password Error"}
            )
    else:
        return flask.jsonify({"status": 401, "reason": "Username or Password Error"})


@APP.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("login"))


if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8081"),
    )
