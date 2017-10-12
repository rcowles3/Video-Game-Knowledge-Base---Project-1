# Codex Gaming

The purpose of this application is to provide the user with an all on one knowledge base, based upon the video game that is searched. Rather than having to search the internet for this information separately, the application implements several API's in order to retrieve information about searched video game, as well as popular videos pulled from YouTube.

At the bottom of the application is a form that sends to a Firebase database that can be used to provide feedback or reccomendations for future updates. 

## Overview

* Upon searching for a game, the application will query the Giantbomb api and retrieve data. The data provided is a detailed description about the game, as well as user reviews. With a link back to the API's page.

* Below the detailed information, is a set of embed YouTube videos taht the user can choose to view in browser, or click to view in YouTube itself. 

## Deployment

Application can be deployed using [Heroku](https://devcenter.heroku.com/articles/git) in which you will find more detailed instructions on how to do so. 

After you have already created a new or cloned the repo, cd into the directory and create a new Heroku app.

The **heroku create** CLI command creates a new empty application on Heroku, along with an associated empty Git repository. If you run this command from your app’s root directory, the empty Heroku Git repository is automatically set as a remote for your local repository.

```
heroku create
```
You can use the **git remote** command to confirm that a remote named heroku has been set for your app:

```
git remote -v
```

To deploy your app to Heroku, you typically use the **git push** command to push the code from your local repository’s master branch to your heroku remote, like so:

```
git push heroku master
```

If you come across any errors, it would be advised to review the [Heroku](https://devcenter.heroku.com/articles/git) documentation for further explanation.

## Built With

* [Firebase](https://firebase.google.com/)
* [jQuery.js](https://jquery.com/)
* [Bootstrap](http://getbootstrap.com/) - CSS Styling

## API's

* [YouTube](https://developers.google.com/youtube/)
* [GiantBomb.com](https://www.giantbomb.com/api/)

## Authors

* **Ryan Cowles** - [Portfolio](https://rcowles.com)
* **William Charles** - [GitHub](https://github.com/wrcharles21)


