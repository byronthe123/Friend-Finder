# Friend-Finder

This is a Node.JS Express app that uses Pug as the template engine. The app requires the user to answer some questions which are passed into an algorithm that matches the player with the most compatible friend.

  

## Getting Started

  

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

  

### Prerequisites

The following must be installed on your machine to run the app locally:

- Git Bash

- NodeJS

- NPM

  
### Installing Dependencies

Use NPM to install all required dependencies:

  

npm install

  

## Running the App

  

Use the following command to start the app:

  

`npm start`

  

## Using the App:

### Demo:

You can use the live app at the following url: https://blooming-shelf-92562.herokuapp.com/


## Programming Methodology

  

### Approach

There are four routes: 

Contained in viewRoutes:

- GET /

- GET /survey

- POST /survey (redirects to the index if successful)

Contained in apiRoutes:

- GET /api/friends (displays JSON data of the Friends array)

Data validation is done using client-side javascript. If all requird data is successfully validated, it is passed into `ajax` which sends a request to the backend to determine the user's most compatible friend. The JSON data response that is returned to the client is rendered as a modal in the `launchModal` function.

The core logic of the app apart from routing is contained in the following function that determines the user's best match: `compatibilityAlgorithm`.


## Built With

  
- NodeJS

- NPM

- Express

- Pug


## Syntax and Conventions

The app is written in ES6. 
