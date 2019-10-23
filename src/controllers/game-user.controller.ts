import GameUserService from "../services/game-user.service";
import { inject } from "inversify";
import ICrud from "../interfaces/crud.interface";
import express from 'express';
import GameService from "../services/game.service";

export default class GameUserController implements ICrud {
    
    constructor(@inject(GameUserService) private service: GameUserService) { }
    
    get(req: express.Request, res: express.Response) {
        return res.boom.notImplemented();
    }
    
    async create(req: express.Request, res: express.Response) {
        try {
            await this.service.linkUserToGame(req.params.userId, req.params.gameId);
            return res.status(204).send();
        } catch (error) {
            return res.boom.boomify(error);
        }
    }

    update(req: express.Request, res: express.Response) { 
        return res.boom.notImplemented();
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            await this.service.unlinkUserToGame(req.params.userId, req.params.gameId);
            return res.status(204).send();
        } catch (error) {
            return res.boom.boomify(error);
        }
    }
}