import { Application } from 'express';
import MainRoute from './routes/main.route';
import ApiRoute from './routes/api.route';
import { connect } from 'mongoose';
import { MongoError } from 'mongodb';
import boom from 'express-boom';

const express = require('express');

export default class Server {
    readonly uri = "mongodb+srv://yolonese:yolonese1234@cluster0-gdmye.gcp.mongodb.net/test?retryWrites=true&w=majority";
    readonly app: Application;
    readonly port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
    }

    configure() {
        connect(this.uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err: MongoError) => {
            if (err) console.error.bind(console, 'MongoDB connection error:');
            else console.log('Mongo db is connected');
        });
        this.app.use(boom());
        this.app.use('/server', new MainRoute().configure());
        this.app.use('/api', new ApiRoute().configure())
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Wathing on port ${this.port}`);
        });
    }
}