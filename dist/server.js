"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express();
        app.get('/', function (req, res) {
            res.send('Hello World');
        });
        app.listen(this.port, () => {
            console.log(`Wathing on port ${this.port}`);
        });
    }
}
exports.default = Server;
