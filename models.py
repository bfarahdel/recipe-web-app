"This is models"
from sqlalchemy.dialects.postgresql import JSON
from flask_login import UserMixin
from vars import db, login_manager


# pylint: disable=E1101
# pylint: disable=R0903


@login_manager.user_loader
def load_user(user_name):
    """
    DOCSTRING"""
    return User.query.get(user_name)


class User(UserMixin, db.Model):
    """
    This is ORM for saved Users
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(80))
    password = db.Column(db.String(120))

    def __repr__(self):
        return f"User('{self.username}', '{self.password}', '{self.email}')"


class Recipe(db.Model):
    """
    This is ORM for saved Receipes

    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    json_field = db.Column(JSON)

    def __repr__(self):
        return f"<Recipe {self.username}, {self.json_field}>"


db.create_all()
