const next = require('next'); //Library for handling server-rendered applications 
const express = require('express'); //Framework for building web applications
const voter = require('./routes/voter'); //Import voter routes
const company = require('./routes/company'); //Import company routes
const candidate = require('./routes/candidate'); //Import candidate routes
const bodyParser = require('body-parser'); //Middleware for parsing the body of requests
const mongoose = require('./config/database'); //Import mongoose, a MongoDB object modeling tool
const exp = express(); //Create a new Express application
const path = require('path'); //Module for manipulating file paths

//Require environment variables
require('dotenv').config({ path: __dirname + '/.env' });

//I HATE MONGODB sowwy
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up body parser middleware
exp.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
exp.use(bodyParser.json());

//Define the homepage route didn't work though
exp.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/pages/homepage.js'));
});

//Use the defined routes for company, voter, and candidate
exp.use('/company', company);
exp.use('/voter', voter);
exp.use('/candidate', candidate);

//Make Next.js
const app = next({
	dev: process.env.NODE_ENV !== 'production',
});

//Define routes for Next.js
const routes = require('./routes');
const handler = routes.getRequestHandler(app);

//Prepare and run Next.js
app.prepare().then(() => {
	exp.use(handler).listen(3000, function () {
		console.log('Node server listening on port 3000');
	});
});