import ApiController from "../controllers/api.controller";
import express from "express";
import interceptApi from "../interceptors/api.interceptor";
import { IRoute } from "../interfaces/route.interface";

export default class ApiRoute implements IRoute<ApiController> {
    endpoint: string = '/api';
    controller: ApiController;

    constructor() {
        this.controller = new ApiController();
    }

    configure(): express.Router {
        const router = express.Router();
        router.use(interceptApi);
        router.get('/:pseudo', (req: express.Request, res: express.Response) => this.controller.getApi(req, res));
        router.post('/', (res: express.Request, req: express.Response) => this.controller.createApi(res, req));
        return router;
    }
}