"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_boom_1 = __importDefault(require("express-boom"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const body_parser_1 = __importDefault(require("body-parser"));
const inversify_1 = require("inversify");
let Server = class Server {
    constructor(routes) {
        this.routes = routes;
        this.uri = "mongodb+srv://yolonese:yolonese1234@cluster0-gdmye.gcp.mongodb.net/test?retryWrites=true&w=majority";
        this.app = express_1.default();
        this.port = parseInt(process.env.PORT, 10) || 4201;
    }
    configure() {
        mongoose_1.connect(this.uri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if (err)
                console.error.bind(console, 'MongoDB connection error:');
            else
                console.log('Mongo db is connected');
        });
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.routes.forEach(route => {
            this.app.use(route.endpoint, route.configure());
            console.log(`Route ${route.endpoint} created`);
        });
        this.app.use(express_boom_1.default());
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Wathing on port ${this.port}`);
        });
    }
};
Server = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.multiInject('IRoute<IController>')),
    __metadata("design:paramtypes", [Array])
], Server);
exports.default = Server;
