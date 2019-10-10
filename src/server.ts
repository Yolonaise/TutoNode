import "reflect-metadata";
import ApiRoute from './routes/api.route';
import boom from 'express-boom';
import express from 'express';
import MainRoute from './routes/main.route';
import { Application } from 'express';
import { MongoError } from 'mongodb';
import { connect } from 'mongoose';
import UserRoute from './routes/user.route';
import bodyParser from 'body-parser';
import { inject, injectable, multiInject } from 'inversify';
import { IRoute } from "./interfaces/route.interface";
import IController from "./interfaces/controller.interface";

@injectable()
export default class Server {
    readonly uri = "mongodb+srv://yolonese:yolonese1234@cluster0-gdmye.gcp.mongodb.net/test?retryWrites=true&w=majority";
    readonly app: Application;
    readonly port: number;

    constructor(@multiInject('IRoute<IController>') private routes: IRoute<IController>[]) {
        this.app = express();
        this.port = parseInt(<string>process.env.PORT, 10) || 4201;
    }

    configure() {
        connect(this.uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err: MongoError) => {
            if (err) console.error.bind(console, 'MongoDB connection error:');
            else console.log('Mongo db is connected');
        });

        this.app.use(boom());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.routes.forEach(route => {
            this.app.use(route.endpoint, route.configure());
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Wathing on port ${this.port}`);
        });
    }
}