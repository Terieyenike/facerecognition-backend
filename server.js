const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'dpg-cn3oa5ol5elc73coue40-a',
    port : 5432,
    user : 'face_detection_api_user',
    password : 'h6PoYoSwvQkRENMUUYFU7elaCRY2YkZJ',
    database : 'face_detection_api'
  }
});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>it is working now</h1>');
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
