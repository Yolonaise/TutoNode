"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_controller_1 = __importDefault(require("../controllers/main.controller"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
const express = require('express');
class MainRoute {
    constructor() {
        this.controller = new main_controller_1.default();
    }
    configure() {
        const router = express.Router();
        router.use(api_interceptor_1.default);
        router.get('/', (req, res) => this.controller.getStatus(req, res));
        return router;
    }
}
exports.default = MainRoute;
