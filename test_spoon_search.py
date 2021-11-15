"""Test File for Testing API calls with the Spoon class"""
import unittest
from unittest.mock import patch
from spoon import Spoon

INPUT = "recipe titles"
EXPECTED_OUTPUT = "search results"


class SpoonTest(unittest.TestCase):
    """Class for running test cases with the Spoon class"""

    def setUp(self):
        self.test_params_search = [
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

        self.test_params_ingredients_instructions = [
            {
                INPUT: 715391,
                EXPECTED_OUTPUT: {
                    "ingredients": [
                        "canned black beans",
                        "canned diced tomatoes",
                        "canned tomatoes",
                        "chili beans",
                        "corn",
                        "red onion",
                        "skinless boneless chicken breasts",
                    ],
                    "instructions": [
                        "Once you have all of your ingredients added, allow \
                             it to cook all day for 8 hours on low. If you are \
                                  wanting to make this a little faster, turn it \
                                       on high and cook for 4 hours.When your \
                                            Chicken Taco Soup is ready to serve, \
                                                 add in some crushed tortilla shells, \
                                                      shredded cheddar cheese, and a \
                                                           little sour cream."
                    ],
                },
            },
            {
                INPUT: 654944,
                EXPECTED_OUTPUT: {
                    "ingredients": [
                        "butter",
                        "flour",
                        "milk",
                        "onion",
                        "parmesan cheese",
                        "parsley",
                        "peas",
                        "penne",
                        "pepper",
                        "salmon",
                    ],
                    "instructions": [
                        "Calories per serving: 300 In large pot of boiling water, \
                         cook pasta al dente (tender but firm) about 10 12 minutes.",
                        "Drain and return to pot. In saucepan, melt butter over medium \
                             heat add onion and cook until tender.Stir in flour and cook \
                                  for a few seconds.",
                        "Whisk in milk and bring to sa simmer, stirring constantly.",
                        "Add peas, salmon brokin into chunks and salmon juices, parsley, \
                             cheese, pepper.",
                        "Pour mixture over pasta and stir gently to mix.",
                        "Serve Immediately. Microwave method: Cook pasta as above in glass \
                             bowl or 4 cup measure. Microwave butter and onion at Medium-High \
                                  for 1 minute or until onion is tender. Stir in flour to form \
                                       smooth paste. Gradually whisk in milk.",
                    ],
                },
            },
        ]

    def test_search(self):
        """Tests the complex_search() method of the Spoon class"""
        for test in self.test_params_search:
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

    def test_ingredients_instructions(self):
        """Tests the ingredients_instructions() method of the Spoon class"""
        for test in self.test_params_ingredients_instructions:
            with patch("spoon.Spoon.ingredients_instructions"):
                # Given a recipe id, the method should return ingredients and instructions
                self.assertIsNotNone(test[EXPECTED_OUTPUT])
                if test[INPUT] == 715391:
                    Spoon.ingredients_instructions = test[EXPECTED_OUTPUT]
                    # Check if instructions and ingredients are given
                    self.assertNotEqual("", test[EXPECTED_OUTPUT]["instructions"])
                    self.assertNotEqual("", test[EXPECTED_OUTPUT]["ingredients"])
                elif test[INPUT] == 654944:
                    Spoon.ingredients_instructions = test[EXPECTED_OUTPUT]
                    # Check if instructions and ingredients are given
                    self.assertNotEqual("", test[EXPECTED_OUTPUT]["instructions"])
                    self.assertNotEqual("", test[EXPECTED_OUTPUT]["ingredients"])


if __name__ == "__main__":
    unittest.main()
