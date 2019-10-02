import { Request, Response } from 'express';
const express = require('express');

export default class Server {

    readonly port: number;
    constructor(port: number) {
        this.port = port;
    }

    start() {
        const app = express();
        app.get('/', function (req: Request, res: Response) {
            res.send('Hello World');
        });

        app.listen(this.port, () => {
            console.log(`Wathing on port ${this.port}`);
        });
    }
}