import { IRoute } from "../interfaces/route.interface";
import GameUserGiftController from "../controllers/game-user-gift.controller";
import { inject, injectable } from "inversify";
import express from 'express';

@injectable()
export default class GameUserGiftRoute implements IRoute<GameUserGiftController> {
    endpoint: string = "/gift";

    constructor(@inject(GameUserGiftController) private controller: GameUserGiftController) { }

    getController(): GameUserGiftController {
        return this.controller;
    }

    configure(): express.Router {
        let router = express.Router();

        router.post('/:giftId', (res: express.Request, req: express.Response) => this.controller.create(res, req));
        router.delete('/:giftId', (res: express.Request, req: express.Response) => this.controller.delete(res, req));

        return router;
    }


}