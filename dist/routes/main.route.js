"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_controller_1 = require("../controllers/main.controller");
const express = require('express');
class MainRoute {
    constructor() {
        this.controller = new main_controller_1.default();
    }
    configure() {
        const router = express.Router();
        // router.use(api_interceptor);
        router.get('/', (req, res) => this.controller.getStatus(req, res));
        return router;
    }
}
exports.default = MainRoute;
