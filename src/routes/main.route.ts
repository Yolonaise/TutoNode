import MainController from "../controllers/main.controller";
import { Router, Request, Response } from "express";
const express = require('express');

export default class MainRoute {
    controller: MainController;

    constructor() {
        this.controller = new MainController();
    }

    configure(): Router {
        const router = express.Router();
        // router.use(api_interceptor);
        router.get('/', (req: Request, res: Response) => this.controller.getStatus(req, res));
        return router;
    }
}