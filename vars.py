import flask, os
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from dotenv import load_dotenv, find_dotenv
from flask_bcrypt import Bcrypt

load_dotenv(find_dotenv())

APP = flask.Flask(__name__, static_folder="./build/static")
APP.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
APP.secret_key = os.getenv("secret_key")

db = SQLAlchemy(APP)
bcrypt = Bcrypt(APP)

login_manager = LoginManager(APP)
login_manager.login_view = "login_page"

import routes
