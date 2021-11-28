"""Handles requests with the YouTube API"""

import os
from pyyoutube import Api
from dotenv import load_dotenv, find_dotenv


class YT:
    """Processes search requests with the YouTube API"""

    load_dotenv(find_dotenv())

    def __init__(self):
        self.api = Api(api_key=os.getenv("youtube_key"))

    def video_search(self, query: str, amount: int):
        """Returns a dictionary with the title, thumbnail url, and embed component for each video"""
        api = self.api
        results = api.search_by_keywords(
            q=query, search_type=["video"], count=amount, limit=amount
        )
        videos = []
        # For each search result get the information for each YouTube video
        for i in range(0, amount):
            info = {}
            items = results.items[i]
            video_id = items.id.videoId
            title = items.snippet.title
            thumbnail = items.snippet.thumbnails.default.url

            # Add video id, title, and thumbnail url to the info dictionary
            info["title"] = title
            info["thumbnail"] = thumbnail
            info["embed"] = YT().get_embed(video_id)
            videos.append(info)
        return videos

    def get_embed(self, video_id: str):
        """Returns the iframe component to embed the video"""
        api = self.api
        result = api.get_video_by_id(video_id=video_id)
        embed = result.items[0].player.embedHtml
        return embed
