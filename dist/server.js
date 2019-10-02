"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_route_1 = require("./routes/main.route");
const api_route_1 = require("./routes/api.route");
const mongoose_1 = require("mongoose");
const express = require('express');
class Server {
    constructor(port) {
        this.uri = "mongodb+srv://yolonese:yolonese1234@cluster0-gdmye.gcp.mongodb.net/test?retryWrites=true&w=majority";
        this.app = express();
        this.port = port;
    }
    configure() {
        mongoose_1.connect(this.uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if (err)
                console.error.bind(console, 'MongoDB connection error:');
            else
                console.log('Mongo db is connected');
        });
        this.app.use('/server', new main_route_1.default().configure());
        this.app.use('/api', new api_route_1.default().configure());
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Wathing on port ${this.port}`);
        });
    }
}
exports.default = Server;
