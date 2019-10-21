import { IRoute } from "../interfaces/route.interface";
import IController from "../interfaces/controller.interface";
import { injectable, inject } from "inversify";
import GiftController from "../controllers/gift.controller";
import express from 'express';
import interceptApi from "../interceptors/api.interceptor";

@injectable()
export default class GiftRoute implements IRoute<IController> {
    endpoint: string = "/gift";

    constructor(@inject(GiftController) private controller: GiftController) { }

    getController(): IController { return this.controller; }

    configure(): express.Router {
        const router = express.Router();

        router.use(interceptApi);

        router.get('/:giftId', (req: express.Request, res: express.Response) => this.controller.get(req, res));
        router.post('/', (res: express.Request, req: express.Response) => this.controller.create(res, req));
        router.put('/:giftId', (res: express.Request, req: express.Response) => this.controller.update(res, req));
        router.delete('/:giftId', (res: express.Request, req: express.Response) => this.controller.delete(res, req));

        return router;
    }


}