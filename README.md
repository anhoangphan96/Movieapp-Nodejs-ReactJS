# Movie Website (ReactJs/NodeJS)

## ReactJS - NodeJS - ExpressJS

The movie app was build on ReactJS, NodeJS/ExpressJS

## Movie Website

An movie website where display all the lastest released movies by it's category fetched from the movie API and Backend. We can click on the picture of the movie to show all information related to that movie and its trailer embeded from Youtube. We also can search the list of movies by keyword and additional filter conditions.

## Demo

\*Note: Please open link back-end first.

- Back-end demo (Render) : [Link](#)
- Front-end demo (Firebase) : [Link](#)

## Project Breakdown

### Backend api server

- Directory: backend
- Features:
  - [x] Building api server (MVC model)
  - [x] Read and fetch data from data file (JSON format) through model to controller and fulfill request to generate data for response.
  - [x] Write controller to handle list film for different types of movies
  - [x] Handle logic to search list of films matched to some conditions
  - [x] Paging mechanism
  - [x] Authenticate and protect route based on dummy token

### Frontend app

- Directory: frontend
- Features:

  - [x] Developing Main page and Search page
  - [x] Display diffrent list types of movies
  - [x] Hanlde data and video trailer when click on any film
  - [x] Search and display data based on filtered conditions
  - [x] React-router

### Clone or download the `Movie App` Respository

#### Prerequisites

- NodeJS
- npm

\*Note:you need backend and frontend runs concurrently in different terminal session, in order to make them talk to each other and avoid comflict

**Make sure you set all variable related to url to localhost on .env file **

#### Frontend usage(PORT: 3000)

url: http://localhost:3000
change backend url to http://localhost:5000 in .env file

```
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm start       // run it locally
```

#### Server-side usage(PORT: 5000)

url: http://localhost:5000

```
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```
