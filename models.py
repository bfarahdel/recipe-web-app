from vars import db, login_manager
from flask_login import UserMixin


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


class Recipe(db.Model):
    username = db.Column(db.String(80), nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"<Artist {self.artist_id}>"


db.create_all()
