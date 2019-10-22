import { injectable } from "inversify";
import Game, { IGame } from "../models/game.model";

@injectable()
export default class GameService {

    async getGame(gameId: string) {
        return await Game.findById(gameId);
    }

    async createGame(game: IGame) {
        return await new Game(game).save();
    }

    async updateGame(gameId: string, game: IGame) {
        return await Game.findByIdAndUpdate(gameId, { ...game }, { new: true });
    }

    async deleteGame(gameId: string) {
        return await Game.findByIdAndDelete(gameId);
    }
}