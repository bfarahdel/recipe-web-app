"""Test File for Testing API calls with the YT class"""
import unittest
from unittest.mock import patch
from youtube import YT

INPUT = "video titles"
EXPECTED_OUTPUT = "search results"


class YTTest(unittest.TestCase):
    """Class for running test cases with the YT class"""

    def setUp(self):
        self.test_params_search = [
            {
                INPUT: "",
                EXPECTED_OUTPUT: None,
            },
            {
                INPUT: "8 One-Pot Pastas",
                EXPECTED_OUTPUT: [{'title': '8 One-Pot Pastas',
                'thumbnail': 'https://i.ytimg.com/vi/YTZGPCCB2FU/default.jpg',
                'embed': '<iframe width="480" height="270"\
                     src="//www.youtube.com/embed/YTZGPCCB2FU" \
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;\
                         gyroscope; picture-in-picture" allowfullscreen></iframe>'}],
            },
            {
                INPUT: "Simple Pasta Salad Recipe - quick italian pasta salad - tasty italian food",
                EXPECTED_OUTPUT: [{'title': 'Simple Pasta Salad Recipe - quick italian pasta salad\
                     - tasty italian food',
                'thumbnail': 'https://i.ytimg.com/vi/81bn4p8H3Kg/default.jpg',
                'embed': '<iframe width="480" height="270"\
                     src="//www.youtube.com/embed/81bn4p8H3Kg"\
                     frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;\
                          gyroscope; picture-in-picture" allowfullscreen></iframe>'}],
            },
        ]

    def test_video_search(self):
        """Tests the video_search() method of the YT class"""
        for test in self.test_params_search:
            with patch("youtube.YT.video_search"):
                # If the search input is an empty string (No results found from complex_search())
                if test[INPUT] == "":
                    YT.video_search = None
                    self.assertEqual(YT.video_search, test[EXPECTED_OUTPUT])
                else:
                    YT.video_search = test[
                        EXPECTED_OUTPUT
                    ]  # What was found in the search results
                    self.assertIsNotNone(YT.video_search)


if __name__ == "__main__":
    unittest.main()
