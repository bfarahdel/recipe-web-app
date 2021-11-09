"""Handles requests with the spoonacular API"""
import os
import requests
from dotenv import load_dotenv, find_dotenv


class Spoon:
    """Processes search requests with the spoonacular API"""

    load_dotenv(find_dotenv())

    def __init__(self):
        self.spoon_key = os.getenv("spoon_key")

    def request_url(self, url: str):
        """Requests a response from the spoonacular API with the input url"""
        # Add API key to the end of the URL
        api_url = f"apiKey={self.spoon_key}"
        url += api_url

        # If there is a response then extract recipe information from the response JSON
        response = requests.get(url=url)
        if response.ok is True:
            response_json = response.json()
            return response_json

        # If the status of the response failed, return None
        return None

    def complex_search(self, query: str):
        """Returns a dictionary with the recipe titles and related images based on query"""
        search_results = {}
        ids = []
        titles = []
        images = []

        # URL to make an API call to spoonacular
        base_url = "https://api.spoonacular.com/recipes/complexSearch?"
        query_url = f"query={query}"
        url = base_url + query_url + "&"

        # If no results are returned from the spoonacular API call, return None
        response_json = self.request_url(url)
        if response_json is None:
            return None

        results = response_json["results"]
        num_results = len(results)
        # If no results are found, return None
        if num_results < 1:
            return None

        # Extract recipe titles and images
        for recipe in results:
            ids.append(recipe["id"])
            titles.append(recipe["title"])
            images.append(recipe["image"])

        search_results["id"] = ids
        search_results["title"] = titles
        search_results["image"] = images
        return search_results

    def ingredients_instructions(self, recipe_id: int):
        """Returns a dictionary with the ingredients and instructions for the recipe id"""
        recipe_info = {}

        # URL to make an API call to spoonacular
        base_url = f"https://api.spoonacular.com/recipes/{recipe_id}/information"
        url = base_url + "?"

        # If no results are returned from the spoonacular API call, return None
        result = self.request_url(url)
        if result is None:
            return None

        result_instructions = result["analyzedInstructions"]
        # If there are no instructions available, return None
        if result_instructions == []:
            instructions = None
        else:
            instruction_steps = result_instructions[0]["steps"]
            # Make a list containing each step of the instructions
            instructions = []
            for steps in instruction_steps:
                instructions.append(steps["step"])

        result_ingredients = result["extendedIngredients"]
        # If there are no ingredients available, return None
        if result_ingredients == []:
            ingredients = None
        else:
            # Make a list containing each ingredient
            ingredients = []
            for ingreds in result_ingredients:
                ingredients.append(ingreds["name"])

            recipe_info["ingredients"] = ingredients
            recipe_info["instructions"] = instructions

        return recipe_info
