from vars import APP
import os

if __name__ == "__main__":
    APP.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=os.getenv("PORT", "8081"),
    )
