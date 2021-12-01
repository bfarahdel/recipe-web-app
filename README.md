# Recipe Finder

https://recipe-finder-project.herokuapp.com/

A website hosted on [Heroku](https://www.heroku.com/) and developed with the Python [Flask](https://flask.palletsprojects.com/en/2.0.x/) web framework and [React](https://reactjs.org/) framework that utilizes a [Heroku PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql) database.

User can make an account, search recipes based on the name of the recipe, and view ingredients and instructions for each recipe searched.

When accessing the website intially, the login page will be displayed on the website. The user can either login or sign up. In order to sign up on the website, the user must enter a username and password between **2 to 20 characters** in length and will be notified if these specifications are not met. Duplicate usernames are **not** allowed and the user will be notified if the username already exists in the database. The **password** is **encrypted**.

The search query can be based on the name of the recipe, nutritional content (e.g. max fat content 25g), dietary restrictions (e.g. “without nuts”).

A drop-down list of the search results will appear below the search bar. If I click on one of the search results, a page with the recipe title, ingredients, and instructions will be displayed on the page. When I am on a recipe and I click the ‘Add to Favs’ button, that recipe will be added into my favorites list when I go back to my home page.

### Pylint Warnings that were disabled
- pylint: disable=W0613, R0201, W0611  => This was a warning saying one variable is not used but it was necessary to run validation checks.
- pylint: disable=E1101 => This said User does not have a query function but it does.
- pylint: disable=C0413, R0401 => This says to import at top but it will cause a circular import if I do.
- pylint: disable=R0903 => This said load_user not used but it was used. 
- pylint: disable=broad-except => This was necessary to go to the except block
- pylint: disable=R0201 => Said query parameter does not exist but it does.

## Getting Started

The following is necessary in order to to run this application when cloning the repository:

- Python [installation](https://www.python.org/downloads/)
- Python [Flask](https://flask.palletsprojects.com/en/2.0.x/) framework
  - Can be installed using the following command: `pip install Flask`
- [.env](https://pypi.org/project/python-dotenv/) file containing the client id and client secret keys from Spotify, the Client Access Token from Genius, the application secret key, and the URL to access the PostgreSQL database.
  - The .env configuration variables can be accessed using the [python-dotenv](https://pypi.org/project/python-dotenv/) library (can be installed using the following command: `pip install python-dotenv`)
- Python [requests](https://docs.python-requests.org/en/latest/) library allows the application to send an HTTP/1.1 request to the API service from the client using the set of API keys in the .env file.
  - Can be installed using the following command: `pip install requests`
- Python [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) is a Flask extension that provides support for SQLAlchemy.
  - Can be installed using the following command: `pip install Flask-SQLAlchemy==2.1`
- Python [psycopg2-binary](https://www.psycopg.org/docs/install.html) is a database adapter that allows management of database interactions.
  - Installation: `pip install psycopg2-binary`
- Python [flask_login](https://flask-login.readthedocs.io/en/latest/) provides user session management for user authentication.
  - Installation: `pip install flask-login`
- Python [flask_bcrypt](https://flask-bcrypt.readthedocs.io/en/latest/) provides bcrypt hashing utilities for the application.
    - Installation: `pip install flask-bcrypt`
- Python [WTForms] (https://wtforms.readthedocs.io/en/3.0.x/) provides forms validation and rendering library for Python web development.
    - Installation: `pip install WTForms==2.3.3`
    - Installation: `pip install Flask-WTF==0.15.1`

### .env File Configuration

To ensure the web application has all the environment variables it needs to run, make sure to set up the following variables:

- Spoonacular API
  - spoon_key

- Necessary for the PostgreSQL database
  - appSecret
    - Can be generated using the Python os library
    ```
    import os
    os.urandom(12)
    ```
  - DATABASE_URL
    - From the Heroku database configuration

## Running the Application

After meeting the requirements in the **Getting Started** section, install the node modules using the command `npm install` (this only needs to be done once for initial setup). After installation, the following lines in the terminal will run the application:

```
npm run build
python3 app.py
```

## Heroku

The web application and database are hosted on Heroku, a cloud platform as a service (PaaS). Please note that the web application and database are two separate Heroku applications. All [config vars](https://devcenter.heroku.com/articles/config-vars) (Spotify API client id and client secret, Genius API Client Access Token, application secret, postgresql database url) from the .env file must be specified in Heroku. A [requirements.txt](https://devcenter.heroku.com/articles/python-support) file should also be included with the libraries used in the application. One additional file, named exactly as [Procfile](https://devcenter.heroku.com/articles/procfile) without a file extension is required to declare process types for the application to be deployed into Heroku. More information on creating a PostgreSQL database in Heroku can be found [here](https://devcenter.heroku.com/articles/heroku-postgresql).

## PostgreSQL Database

Prior to using the application, the database model must be created from `main.py`. To do this, in run the following commands in an interactive Python shell:

```
from main import db
db.create_all()
```

More information can be found on the Flask-SQLAlchemy [quickstart](https://flask-sqlalchemy.palletsprojects.com/en/2.x/quickstart/) page
