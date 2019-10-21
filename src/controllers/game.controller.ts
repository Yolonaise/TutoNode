import ICrud from "../interfaces/crud.interface";
import express from "express";
import { injectable } from "inversify";
import { validateGetGame, validateUpdateGame, validateDeleteGame } from "../validators/game.validator";
import Game, { IGame } from "../models/game.model";

@injectable()
export default class GameController implements ICrud {
    async get(req: express.Request, res: express.Response) {
        const error = validateGetGame(req);
        if (error)
            return res.boom.boomify(error);

        try {
            let game = await Game.findById(req.params.gameId);
            return res.status(200).send({ game: game });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async create(req: express.Request, res: express.Response) {
        const error = validateGetGame(req);
        if (error)
            return res.boom.boomify(error);

        try {
            const result = await new Game({ ...req.body }).save();
            return res.status(200).send({ game: result });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async update(req: express.Request, res: express.Response) {
        const error = validateUpdateGame(req);
        if (error)
            return res.boom.boomify(error);

        try {
            let result = await Game.findOneAndUpdate({ _id: req.params.gameId }, { ...req.body }, { new: true });
            return res.status(200).send({ game: result });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        const error = validateDeleteGame(req);
        if (error)
            return res.boom.boomify(error);

        try {
            await Game.findByIdAndDelete(req.params.gameId);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
}