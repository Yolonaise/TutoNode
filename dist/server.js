"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_route_1 = __importDefault(require("./routes/api.route"));
const express_boom_1 = __importDefault(require("express-boom"));
const express_1 = __importDefault(require("express"));
const main_route_1 = __importDefault(require("./routes/main.route"));
const mongoose_1 = require("mongoose");
class Server {
    constructor(port) {
        this.uri = "mongodb+srv://yolonese:yolonese1234@cluster0-gdmye.gcp.mongodb.net/test?retryWrites=true&w=majority";
        this.app = express_1.default();
        this.port = port;
    }
    configure() {
        mongoose_1.connect(this.uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if (err)
                console.error.bind(console, 'MongoDB connection error:');
            else
                console.log('Mongo db is connected');
        });
        this.app.use(express_boom_1.default());
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
