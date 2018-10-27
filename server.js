//Process all the require
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const main = require('./routes/main.route');
const todo = require('./routes/todo.route');
const user = require('./routes/user.route');
const api = require('./routes/api.route');
const ini = require('./ini');

//Instanciate server's Objects
const app = express();

//Register mongoose db
mongoose.connect(ini.mongo.url, {useNewUrlParser : true }, function(err, db){
    if(err) console.error.bind(console, 'MongoDB connection error:');
    else console.log('Mongo db is connected');
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

//Register json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Register routes
app.use('/todo', todo);
app.use('/server', main);
app.use('/user', user);
app.use('/api', api);

//Listenning
app.listen(ini.server.port, ini.server.hostname, () => {
    console.log('Server is up and running on port numner ' + ini.server.port);
});