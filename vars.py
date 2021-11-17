"""

This file has all the configurations for flask, database and login

"""
import os
import flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from dotenv import load_dotenv, find_dotenv
from flask_bcrypt import Bcrypt

load_dotenv(find_dotenv())

APP = flask.Flask(__name__, static_folder="./build/static")
APP.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
APP.secret_key = os.getenv("secret_key")

db = SQLAlchemy(APP)
bcrypt = Bcrypt(APP)

login_manager = LoginManager(APP)
login_manager.login_view = "login_page"

# pylint: disable=W0611
# pylint: disable=R0401
import routes  # pylint: disable=C0413
