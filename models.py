"This is models"
from flask_login import UserMixin
from vars import db, login_manager


@login_manager.user_loader
def load_user(user_name):
    """
    DOCSTRING"""
    return User.query.get(user_name)


class User(UserMixin, db.Model):
    """
    DOCSTRING"""

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(120))

    def __repr__(self):
        return f"User('{self.username}', '{self.password}')"


class Recipe(db.Model):
    """
    DOCSTRING"""

    username = db.Column(db.String(80), nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"<Artist {self.recipe_id}>"


db.create_all()
