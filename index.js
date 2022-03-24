const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express()

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./database");


app.use(express.json()) //Pour parser du json



app.get("/", (req, res, next) =>
    res.json({ message: "Firebase function service is working" })
);
app.get("/todos", (req, res, next) =>
    res.json({ message: "Get a list of todos" })
);

app.get("/newuser/:name", async (req, res, next) => {
    const name = req.params.name;
    const user = { name: name };
    const result = await db.create("users", user);
    user.id = result.id;
    return res.json(user);
});

app.get("/deleteuser/:id", async (req, res, next) => {
    const userId = req.params.id;
    const result = await db.delete("users", userId);
    console.log(result);
    return res.json(userId);
});

exports.api = functions.https.onRequest(app);

// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
    timeoutSeconds: 300,
});


app.post('/login', function (req, res, next) {
    if (!req.body.email) return res.status(400).json({error: 'missing email'});
    if (!req.body.password) return res.status(400).json({error: 'missing password'});
  
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) // don't persist auth session
    .then(function() {
      return firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
    })
    .then((user) => { // https://firebase.google.com/docs/reference/js/firebase.User
      let uid = user.uid;
  
      // set cookie with UID or some other form of persistence
      // such as the Authorization header
      res.cookie('__session', { uid: uid }, { signed: true, maxAge: 3600 });
      res.set('cache-control', 'max-age=0, private') // may not be needed. Good to have if behind a CDN.
      res.send('You have successfully logged in');
  
      return firebase.auth().signOut(); //clears session from memory
    })
    .catch((err) => {
      next(err);
    });
  });


app.post('/register', async function (req, res, next) {
    console.log(req.body);
    if (!req.body.email) return res.status(400).json({error: 'missing email'});
    if (!req.body.password) return res.status(400).json({error: 'missing password'});
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const full_name = req.body.full_name;

    const auth = db.create_user(email,username,password,full_name) //Returns the uid of the user

    const user = { username: username,
                    email:email,
                    full_name:full_name,
                    uid : auth
    };

    const result = await db.create("users", user);
    user.id = result.id;


    return res.json(user);
  });

  
app.post('newpost',async function (req, res, next) {


});



  module.exports = app;
  

app.listen(8080, () => {
    console.log('Listening on port 8080')
})