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
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
const inversify_1 = require("inversify");
let UserRoute = class UserRoute {
    constructor(controller) {
        this.endpoint = '/user';
        this.controller = controller;
    }
    getController() { return this.controller; }
    configure() {
        const router = express_1.default.Router();
        router.use(api_interceptor_1.default);
        router.get('/:userId', (req, res) => this.controller.get(req, res));
        router.post('/', (req, res) => this.controller.create(req, res));
        router.put('/:userId', (req, res) => this.controller.update(req, res));
        router.delete('/:userId', (req, res) => this.controller.delete(req, res));
        router.get('/bygame/:gameId', (req, res) => this.controller.getAllUserByGames(req, res));
        router.post('/enterin', (req, res) => this.controller.enterIn(req, res));
        return router;
    }
};
UserRoute = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(user_controller_1.default)),
    __metadata("design:paramtypes", [user_controller_1.default])
], UserRoute);
exports.default = UserRoute;
