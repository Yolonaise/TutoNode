//Process all the require
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const main = require('./routes/main.route');
const api = require('./routes/api.route');
const log_interceptror = require('./interceptors/log.interceptor');

var PORT = process.env.PORT || 8080;
//Instanciate server's Objects
const app = express();

const uri = "mongodb+srv://yolonese:yolonese1234@cluster0-gdmye.gcp.mongodb.net/test?retryWrites=true&w=majority";

//Register mongoose db
mongoose.connect(uri, { useNewUrlParser: true }, function (err, db) {
    if (err) console.error.bind(console, 'MongoDB connection error:');
    else console.log('Mongo db is connected');
});

mongoose.Promise = global.Promise;

//Register json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(log_interceptror);

//Register routes
app.use('/server', main);
app.use('/api', api);

//Listenning
app.listen(PORT, () => {
    console.log('Server is up and running on port ' + PORT);
});