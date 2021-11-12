"This is models"
from flask_login import UserMixin
from vars import db, login_manager
from sqlalchemy.dialects.postgresql import JSON


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
    email = db.Column(db.String(80))
    password = db.Column(db.String(120))

    def __repr__(self):
        return f"User('{self.username}', '{self.password}', '{self.email}')"


class Recipe(db.Model):
    """
    {'id': [654944, 632778], 'title': ['Pasta With Salmon Cream Sauce', 'Artisan Farfalle Pasta With Smoked Salmon and Cream Sauce'], 'image': ['https://spoonacular.com/recipeImages/654944-312x231.jpg', 'https://spoonacular.com/recipeImages/632778-312x231.jpg']}

    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    json_field = db.Column(JSON)

    def __repr__(self):
        return f"<Artist {self.username}>"


db.create_all()
