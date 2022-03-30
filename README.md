# gazouille-api
NodeJS API for a social network named gazouille. School project.
The API will we used by a mobile application. 

## Setup

 The API uses Firestore as database. It's a NoSQL service that can be easily setup. 

Create a firebase project [here](https://firebase.google.com/) and then create a firestore and auth databases. 

1. In the Firebase console, open Settings > Service Accounts.

2. Click Generate New Private Key, then confirm by clicking Generate Key.

3. Securely store the JSON file containing the key.

Put the service key in the root directory of the project with the name `serviceAccountKey.json`

## Implementation 

The `database.js` file contains the database calls with basic CRUD operations and some application specific functions. 

The `index.js` file contains the server initialisation and the different routes for the HTTP requests. 

The API documentation can be found [here](https://app.swaggerhub.com/apis/smarbal/gazouille_API/1.0.0).