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
        api_url = f"&apiKey={self.spoon_key}"
        url += api_url

        # If there is a response then extract recipe information from the response JSON
        response = requests.get(url=url)
        response_json = response.json()
        if response.ok is True:
            results = response_json["results"]
            num_results = len(results)
            # If no results are found, return None
            if num_results < 1:
                return None

            return results

        # If the status of the response failed, return None
        return None

    def complex_search(self, query: str):
        """Returns a dictionary with the recipe titles and related images based on query"""
        search_results = {}
        titles = []
        images = []

        # URL to make an API call to spoonacular
        base_url = "https://api.spoonacular.com/recipes/complexSearch?"
        query_url = f"query={query}"
        url = base_url + query_url

        # If no results are returned from the spoonacular API call, return None
        results = self.request_url(url)
        if results is None:
            return None

        # Extract recipe titles and images
        for recipe in results:
            titles.append(recipe["title"])
            images.append(recipe["image"])

        search_results["title"] = titles
        search_results["image"] = images
        return search_results
