"""Validates if the user entered a correct email and username during login"""


class Validation:
    """Validates if the user used the correct login credentials"""

    def __init__(self, word):
        self.word = word

    def validation_email(self):
        """Validates the user's email"""
        if self.word.find("@") == -1:
            return False

        return True

    def validation_username(self):
        """Validates the user's username"""
        if len(self.word) > 10:
            return False

        return True
