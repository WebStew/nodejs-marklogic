# Mark Logic Database setup

## Good articles

Reading the below article will give a rough idea on how the Mark Logic NPM module works and how
to set it up.

* http://www.tamas.io/javascript-in-a-nosql-database/
* http://www.tamas.io/marklogic-and-node-js/

## Install Mark Logic

[Download](https://developer.marklogic.com/products) and [install](https://docs.marklogic.com/guide/installation/procedures) Mark Logic Server 8.

Once installed start the Mark Logic Server by clicking on the shortcut that has been added to your Windows startbar. You'll be able to view both the [admin](http://localhost:8001/) and [query console](http://localhost:8000/qconsole/) screens.

## Create a Mark Logic Database

Change directory to `[project-name]/database` and run the below CURL command into the Mark Logic Rest API to create a Database. The database will be created with the configuration options we have listed within the configuration.json file in this directory.

```
Terminal $: cd [project-name]/database
Terminal $: curl --digest --user admin:admin -X POST -d@"configuration.json" -i -H "Content-type:application/json" http://localhost:8002/v1/rest-apis
```

## Populate the Mark Logic Database

In the [query console](http://localhost:8000/qconsole/) screen select the wiley-online-library as your content source from the drop down menu and run the below XQuery to populate the Mark Logic Database.

```XQuery is currently private```

## Setup the Node Application

In the project directory install the [NPM](https://www.npmjs.com/) dependencies using the following commands.

```
Terminal $: cd ..
Terminal $: NPM install
```

Start the NodeJS application using [Nodemon](https://github.com/remy/nodemon).

```
Terminal $: nodemon server.js
```

[Navigate to a full article endpoint](http://localhost:3000/v0.0.1/article/10.1002/cae.21613/aggregate) and check to ensure that the article is being return in JSON format.
