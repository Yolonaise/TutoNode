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

        router.get('/:email', (req: express.Request, res: express.Response) => this.controller.get(req, res));
        router.post('/', (req: express.Request, res: express.Response) => this.controller.create(req, res));
        router.put('/', (req: express.Request, res: express.Response) => this.controller.update(req, res));
        router.delete('/', (req: express.Request, res: express.Response) => this.controller.delete(req, res));

        return router;
    }
}