import "reflect-metadata";
import express from 'express';
import { IRoute } from '../interfaces/route.interface';
import UserController from '../controllers/user.controller';
import interceptApi from '../interceptors/api.interceptor';
import { inject, injectable } from 'inversify';
import ICrud from "../interfaces/crud.interface";

@injectable()
export default class UserRoute implements IRoute<ICrud> {
    endpoint: string = '/user';
    controller: UserController;

    constructor(@inject(UserController) controller: UserController) {
        this.controller = controller;
    }

    getController(): UserController { return this.controller; }

    configure(): express.Router {
        const router = express.Router();

        router.use(interceptApi);

        router.get('/:email', (req: express.Request, res: express.Response) => this.controller.get(req, res));
        router.post('/', (req: express.Request, res: express.Response) => this.controller.create(req, res));
        router.put('/', (req: express.Request, res: express.Response) => this.controller.update(req, res));
        router.delete('/', (req: express.Request, res: express.Response) => this.controller.delete(req, res));

        return router;
    }
}