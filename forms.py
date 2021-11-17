"""This file has html forms validations done here"""
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Length, ValidationError
from models import User


def correct_email(form, field):  # pylint: disable=W0613
    """This function is one of the validation checks for email field in html"""
    if field.data.find("@") == -1:
        raise ValidationError("This is not a valid email")


class RegistrationForm(FlaskForm):
    """This creates different html form fields with validations"""

    username = StringField(
        "Username", validators=[DataRequired(), Length(min=2, max=20)]
    )
    email = StringField("Email", validators=[DataRequired(), correct_email])
    password = PasswordField(
        "Password", validators=[DataRequired(), Length(min=6, max=12)]
    )
    submit = SubmitField("Sign up")

    def validate_username(self, username):  # pylint: disable=R0201
        """This is a function to check if a user already exits in database"""
        user = User.query.filter_by(  # pylint: disable=E1101
            username=username.data
        ).first()
        if user:
            raise ValidationError("This username is already taken")

    def validate_email(self, email):  # pylint: disable=R0201
        """This is a function to check if an email already exits in database"""
        user = User.query.filter_by(email=email.data).first()  # pylint: disable=E1101
        if user:
            raise ValidationError("This email is already taken")


class LoginForm(FlaskForm):
    """This creates different html form fields with validations for login page"""

    email = EmailField("Email", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Log in")
