"""Testing Login Credential Methods from the Validation Class"""
import unittest
from validations import Validation

INPUT = "user_input"


class LoginTest(unittest.TestCase):
    """Test Login Credentials for Usernames and Emails"""

    def setUp(self):
        self.test_correct_usernames = [
            {INPUT: "fakeUser"},
            {INPUT: "fakeUser2"},
        ]
        self.test_incorrect_usernames = [
            {INPUT: "a"},
            {INPUT: "z"},
        ]
        self.test_correct_emails = [
            {INPUT: "fakeUser42@gmail.com"},
            {INPUT: "anotherFake42@gmail.com"},
        ]
        self.test_incorrect_emails = [
            {INPUT: "fakeUser42"},
            {INPUT: "anotherFake42"},
        ]

    def test_correct_user(self):
        """Test username inputs"""
        for test in self.test_correct_usernames:
            self.assertTrue(Validation(True).validation_username(test[INPUT]))

    def test_incorrect_user(self):
        """Test username inputs"""
        for test in self.test_incorrect_usernames:
            self.assertFalse(Validation(True).validation_username(test[INPUT]))

    def test_correct_email(self):
        """Test email inputs"""
        for test in self.test_correct_emails:
            self.assertTrue(Validation(True).validation_email(test[INPUT]))

    def test_incorrect_email(self):
        """Test email inputs"""
        for test in self.test_incorrect_emails:
            self.assertFalse(Validation(True).validation_email(test[INPUT]))


if __name__ == "__main__":
    unittest.main()
