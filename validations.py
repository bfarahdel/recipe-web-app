class Validation:
    def __init__(self, word):
        self.word = word

    def validation_email(self):
        if self.word.find("@") == -1:
            print("False")

        else:
            print("True")

    def validation_username(self):
        if len(self.word) > 10:
            print("Word is too large")
        else:
            print("OK")
