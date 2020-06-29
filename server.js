const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');
const profile = require('./Controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get( '/', (req, res) => { res.send('It is working!'); });
app.post( '/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} );
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} );
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)} );
app.put('/image', (req, res) => {image.handleImage(req, res, db)} );
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)} );

app.listen(process.env.PORT || 3000, () => {
	console.log('I am working at ' + process.env.PORT);
});