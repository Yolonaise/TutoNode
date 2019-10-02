"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_controller_1 = require("../controllers/api.controller");
const express = require('express');
class ApiRoute {
    constructor() {
        this.controller = new api_controller_1.default();
    }
    configure() {
        const router = express.Router();
        // router.use(api_interceptor);
        router.get('/get/:pseudo', (res, req) => this.controller.getApi(res, req));
        //router.get('/get/:pseudo', (res: Request, req: Response) => this.controller.createApi(res, req));
        return router;
    }
}
exports.default = ApiRoute;
