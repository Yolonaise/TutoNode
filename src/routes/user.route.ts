import express from 'express';
import { IRoute } from '../interfaces/route.interface';
import UserController from '../controllers/user.controller';
import interceptApi from '../interceptors/api.interceptor';

export default class UserRoute implements IRoute<UserController> {
    endpoint: string = '/user';
    controller: UserController;

    constructor() {
        this.controller = new UserController();
    }

    configure(): express.Router {
        const router = express.Router();

        router.use(interceptApi);

        router.get('/:pseudo', (res: express.Request, req: express.Response) => this.controller.get(res, req));
        router.post('/', (res: express.Request, req: express.Response) => this.controller.create(res, req));
        router.put('/', (res: express.Request, req: express.Response) => this.controller.update(res, req));
        router.delete('/', (res: express.Request, req: express.Response) => this.controller.delete(res, req));

        return router;
    }
}