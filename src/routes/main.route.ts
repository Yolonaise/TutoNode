import "reflect-metadata";
import MainController from "../controllers/main.controller";
import express from "express";
import interceptApi from "../interceptors/api.interceptor";
import { IRoute } from "../interfaces/route.interface";
import { inject, injectable } from "inversify";
import IController from "../interfaces/controller.interface";

@injectable()
export default class MainRoute implements IRoute<IController> {
    endpoint: string = "/server";

    constructor(@inject(MainController) protected controller: MainController) {
    }

    getController(): MainController { return this.controller; }

    configure(): express.Router {
        const router = express.Router();

        router.use(interceptApi);
        router.get('/', (req: express.Request, res: express.Response) => this.controller.getStatus(req, res));

        return router;
    }
}