//NOTE: WE SHOULD TRY TO WORK SOMETHING OUT WITH MYSQL AND/OR FIREBASE 
//IF WE CANNOT GET ANYTHING TO WORK WITH MONGODB

//database.js

//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/BlockVotes';
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;