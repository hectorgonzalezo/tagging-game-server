# Photo tagging game server 

Back end for Photo tagging game MERN app.

Code for the front end can be found [here](https://github.com/hectorgonzalezo/tagging-game);

By [Héctor González Orozco](https://github.com/hectorgonzalezo)

## :computer: Built With

* [TypeScript](https://www.typescriptlang.org/)
* [NodeJS](https://nodejs.org/)
* [ExpressJS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)


## :pager: API URL

Hosted at: [https://wheres-waldo-server.fly.dev](https://wheres-waldo-server.fly.dev)

## :rocket: Features

- Look for a match in server-stored results.

- Get all scores to populate client leaderboard.

- Add new scores.


## :construction: Installing

1. Clone the repository

`git clone https://github.com/hectorgonzalezo/tagging-game`

2. Install dependencies

`npm install`

3. Create a .env file on root directory of project with Mongo DB URI and authorization string. The format must be the following:

`MONGODB_URI="mongoUri"`
`AUTH_SECRET="randomString"`

4. Start the server

`npm start`

Typescript code can be compiled by using the following command:

`npm run build`

Alternatively, The server can be started and compiled in real-time after detecting changes by using:

`npm run dev`

## :white_check_mark: Tests

API is thoroughly tested. Tests can be run by using:

`npx jest`


## Endpoints

**JSON response examples**

- Result
```json
{
  "result": true
}
```

- Score :
```json
  "score":{
    "name": "Juan",
    "score": "0:15:01",
  }
```

- Errors:
```json
{
  "errors": [
    { "msg": "Only the user itself can update it" }
  ]
}
```


### :dart: Results

#### - GET /results/?character=characterName&x=100&y=100

Retrieves basic info about a user

**Query strings**

- charater: the name of the character to look for.

- x: coordinate along the x axis of the original image.

- y: coordiante along the y axis of the original image.


**Response**

- `200 OK` and Result JSON with result: true if there's a match.

- `404 Not Found` and Result JSON with result: false if there's no match;

- `404 Bad Request` and Errors JSON if there's something wrong with the query.


### :memo: Scores

#### - GET /scores

Gets all scores in database.

**Response**

- `200 OK` and JSON with array of Scores in the "scores" property.


#### - POST /scores

Adds a new score

**Header and Data example**
- Header: `"Content-Type: application/json"`
- Data example: `{ name: "Juan", score: "0:15:01" }`


**Response**

- `200 OK` and Score JSON on success.

- `400 Bad Request` and Error JSON if given wrong data format.
