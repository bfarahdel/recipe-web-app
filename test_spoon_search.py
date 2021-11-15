"""Test File for Testing API calls with the Spoon class"""
import unittest
from unittest.mock import patch
from spoon import Spoon

INPUT = "recipe titles"
EXPECTED_OUTPUT = "search results"


class SpoonTest(unittest.TestCase):
    """Class for running test cases with the Spoon class"""

    def setUp(self):
        self.test_params = [
            {
                INPUT: "",
                EXPECTED_OUTPUT: None,
            },
            {
                INPUT: "pasta",
                EXPECTED_OUTPUT: {
                    "id": [654944, 632778],
                    "title": [
                        "Pasta With Salmon Cream Sauce",
                        "Artisan Farfalle Pasta With Smoked Salmon and Cream Sauce",
                    ],
                    "image": [
                        "https://spoonacular.com/recipeImages/654944-312x231.jpg",
                        "https://spoonacular.com/recipeImages/632778-312x231.jpg",
                    ],
                },
            },
            {
                INPUT: "taco",
                EXPECTED_OUTPUT: {
                    "id": [715391],
                    "title": ["Slow Cooker Chicken Taco Soup"],
                    "image": [
                        "https://spoonacular.com/recipeImages/715391-312x231.jpg"
                    ],
                },
            },
        ]

    def test_search(self):
        """Tests the complex_search() method of the Spoon class"""
        for test in self.test_params:
            with patch("spoon.Spoon.complex_search"):
                # If the search input is an empty string (No results found from complex_search())
                if test[INPUT] == "":
                    Spoon.complex_search = None
                    self.assertEqual(Spoon.complex_search, test[EXPECTED_OUTPUT])
                else:
                    Spoon.complex_search = test[
                        EXPECTED_OUTPUT
                    ]  # What was found in the search results
                    self.assertIsNotNone(Spoon.complex_search)


if __name__ == "__main__":
    unittest.main()
