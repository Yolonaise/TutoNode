import ApiController from "../controllers/api.controller";
import express from "express";
import interceptApi from "../interceptors/api.interceptor";

export default class ApiRoute {
    controller: ApiController;

    constructor() {
        this.controller = new ApiController();
    }

    configure(): express.Router {
        const router = express.Router();
        router.use(interceptApi);
        router.get('/get/:pseudo', (res: express.Request, req: express.Response) => this.controller.getApi(res, req));
        //router.get('/get/:pseudo', (res: Request, req: Response) => this.controller.createApi(res, req));
        return router;
    }
}