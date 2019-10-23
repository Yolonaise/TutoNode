import GameUserController from "../controllers/game-user.controller";
import express from 'express';
import { IRoute } from "../interfaces/route.interface";
import { inject, injectable } from "inversify";

@injectable()
export default class GameUserRoute implements IRoute<GameUserController> {
    endpoint: string = "/user";
    
    constructor(@inject(GameUserController) private controller: GameUserController) { }

    getController(): GameUserController {
        return this.controller;
    }

    configure(): express.Router {
        let router = express.Router();

        router.post('/:userId', (res: express.Request, req: express.Response) => this.controller.create(res, req));
        router.delete('/:userId', (res: express.Request, req: express.Response) => this.controller.delete(res, req));

        return router;
    }
} 