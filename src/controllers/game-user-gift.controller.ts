import ICrud from "../interfaces/crud.interface";
import express from 'express';
import { inject, injectable } from "inversify";
import GameUserGiftService from "../services/game-user-gift.service";

@injectable()
export default class GameUserGiftController implements ICrud {

    constructor(@inject(GameUserGiftService) private service: GameUserGiftService) { }

    get(req: express.Request, res: express.Response) {
        return res.boom.notImplemented();
    }

    async create(req: express.Request, res: express.Response) {
        try {
            await this.service.linkGiftToUserGame(req.params.giftId, req.query["userId"], req.query["gameId"]);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
    update(req: express.Request, res: express.Response) {
        return res.boom.notImplemented();
    }
    async delete(req: express.Request, res: express.Response) {
        try {
            await this.service.unlinkGiftToUserGame(req.params.giftId, req.query["userId"], req.query["gameId"]);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
}