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
const inversify_1 = require("inversify");
const gift_controller_1 = __importDefault(require("../controllers/gift.controller"));
const express_1 = __importDefault(require("express"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
let GiftRoute = class GiftRoute {
    constructor(controller) {
        this.controller = controller;
        this.endpoint = "/gift";
    }
    getController() { return this.controller; }
    configure() {
        const router = express_1.default.Router();
        router.use(api_interceptor_1.default);
        router.get('/:giftId', (req, res) => this.controller.get(req, res));
        router.post('/', (res, req) => this.controller.create(res, req));
        router.put('/:giftId', (res, req) => this.controller.update(res, req));
        router.delete('/:giftId', (res, req) => this.controller.delete(res, req));
        router.get('/byuser/:userId', (res, req) => this.controller.getAllGiftByUser(res, req));
        router.get('/bygame/:game', (res, req) => this.controller.getAllGiftByGame(res, req));
        return router;
    }
};
GiftRoute = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(gift_controller_1.default)),
    __metadata("design:paramtypes", [gift_controller_1.default])
], GiftRoute);
exports.default = GiftRoute;
