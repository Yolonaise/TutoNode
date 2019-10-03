import MainController from "../controllers/main.controller";
import express from "express";
import interceptApi from "../interceptors/api.interceptor";

export default class MainRoute {
    controller: MainController;

    constructor() {
        this.controller = new MainController();
    }

    configure(): express.Router {
        const router = express.Router();
        router.use(interceptApi);
        router.get('/', (req: express.Request, res: express.Response) => this.controller.getStatus(req, res));
        return router;
    }
}