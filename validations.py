"""Validates if the user entered a correct email and username during login"""


class Validation:
    """Validates if the user used the correct login credentials"""

    def __init__(self, validate) -> None:
        self.validate = validate

    def validation_email(self, user_in):
        """Validates the user's email"""
        if self.validate:
            if user_in.find("@") == -1:
                return False
            return True
        return False

    def validation_username(self, user_in):
        """Validates the user's username"""
        if self.validate:
            if len(user_in) < 2 or len(user_in) > 20:
                return False
            return True
        return False
