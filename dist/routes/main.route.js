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
const main_controller_1 = __importDefault(require("../controllers/main.controller"));
const express_1 = __importDefault(require("express"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
const inversify_1 = require("inversify");
let MainRoute = class MainRoute {
    constructor(controller) {
        this.controller = controller;
        this.endpoint = "/server";
    }
    getController() { return this.controller; }
    configure() {
        const router = express_1.default.Router();
        router.use(api_interceptor_1.default);
        router.get('/', (req, res) => this.controller.getStatus(req, res));
        return router;
    }
};
MainRoute = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(main_controller_1.default)),
    __metadata("design:paramtypes", [main_controller_1.default])
], MainRoute);
exports.default = MainRoute;
