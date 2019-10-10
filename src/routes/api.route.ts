import "reflect-metadata";
import ApiController from "../controllers/api.controller";
import express from "express";
import interceptApi from "../interceptors/api.interceptor";
import { IRoute } from "../interfaces/route.interface";
import { injectable, inject } from 'inversify';
import ICrud from "../interfaces/crud.interface";

@injectable()
export default class ApiRoute implements IRoute<ICrud> {
    endpoint: string = '/api';
    controller: ApiController;

    constructor(@inject(ApiController) controller: ApiController) {
        this.controller = controller;
    }

    getController(): ApiController { return this.controller; }

    configure(): express.Router {
        const router = express.Router();

        router.use(interceptApi);

        router.get('/:email', (req: express.Request, res: express.Response) => this.controller.get(req, res));
        router.post('/', (res: express.Request, req: express.Response) => this.controller.create(res, req));
        router.put('/', (res: express.Request, req: express.Response) => this.controller.update(res, req));
        router.delete('/:email/:applicationName', (res: express.Request, req: express.Response) => this.controller.delete(res, req));

        return router;
    }
}