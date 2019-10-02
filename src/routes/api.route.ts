import ApiController from "../controllers/api.controller";
import { Router, Request, Response } from "express";
import interceptApi from "../interceptors/api.interceptor";
const express = require('express');

export default class ApiRoute {
    controller: ApiController;

    constructor() {
        this.controller = new ApiController();
    }

    configure(): Router {
        const router = express.Router();
        router.use(interceptApi);
        router.get('/get/:pseudo', (res: Request, req: Response) => this.controller.getApi(res, req));
        //router.get('/get/:pseudo', (res: Request, req: Response) => this.controller.createApi(res, req));
        return router;
    }
}