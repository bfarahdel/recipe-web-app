# Recipe Finder

https://recipe-swe-project.herokuapp.com/

User can make an account, search recipes based on the name of the recipe (e.g. pasta, taco, pizza, etc.), and view ingredients and instructions for each recipe searched.

- pylint: disable=W0613, R0201, W0611  => This was a warning saying one variable is not used but it was necessary to run validation checks.
- pylint: disable=E1101 => This said User does not have a query function but it does.
- pylint: disable=C0413, R0401 => This says to import at top but it will cause a circular import if I do.
- pylint: disable=R0903 => This said load_user not used but it was used. 
- pylint: disable=broad-except => This was necessary to go to the except block
- pylint: disable=R0201 => Said query parameter does not exist but it does.
