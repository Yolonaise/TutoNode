import ICrud from "../interfaces/crud.interface";
import express from "express";
import { injectable, inject } from "inversify";
import { validateGetGame, validateUpdateGame, validateDeleteGame, validateCreateGame } from "../validators/game.validator";
import GameService from "../services/game.service";

@injectable()
export default class GameController implements ICrud {
    constructor(@inject(GameService) private service: GameService) { }

    async get(req: express.Request, res: express.Response) {
        try {
            validateGetGame(req);
            let game = await this.service.getGame(req.params.gameId);
            return res.status(200).send({ game: game });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            validateCreateGame(req);
            let game = await this.service.createGame(req.body);
            return res.status(200).send({ game: game });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            validateUpdateGame(req)
            let game = await this.service.updateGame(req.params.gameId, req.body)
            return res.status(200).send({ game: game });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            validateDeleteGame(req);
            await this.service.deleteGame(req.params.gameId);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
}