"""
This file is just used to run the application

"""
import os
from vars import APP

if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8088"),
    )
