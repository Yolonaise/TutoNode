"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_controller_1 = __importDefault(require("../controllers/api.controller"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
const express = require('express');
class ApiRoute {
    constructor() {
        this.controller = new api_controller_1.default();
    }
    configure() {
        const router = express.Router();
        router.use(api_interceptor_1.default);
        router.get('/get/:pseudo', (res, req) => this.controller.getApi(res, req));
        //router.get('/get/:pseudo', (res: Request, req: Response) => this.controller.createApi(res, req));
        return router;
    }
}
exports.default = ApiRoute;
