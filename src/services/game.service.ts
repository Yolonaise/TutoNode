import { injectable, multiInject, inject } from "inversify";
import Game, { IGame } from "../models/game.model";
import { Observer } from "../interfaces/observers/service.observer";
import { IGameListenner } from "../interfaces/listeners/game.service.listener";
import GameUserService from "./game-user.service";

@injectable()
export default class GameService extends Observer<IGameListenner> {

    constructor(
        @multiInject("IGameListener") listeners: IGameListenner[],
        @inject(GameUserService) private gameUserService: GameUserService) {
        super(listeners);
    }

    async getGame(gameId: string) {
        return await Game.findById(gameId);
    }

    async createGame(game: IGame) {
        const result = await new Game(game).save();
        this.listeners.forEach(l => { l.onGameCreated(result); });

        return result;
    }

    async updateGame(gameId: string, game: IGame) {
        const result = await Game.findByIdAndUpdate(gameId, { ...game }, { new: true });
        this.listeners.forEach(l => { l.onGameUpdated(game, result as IGame); });

        return result;
    }

    async deleteGame(gameId: string) {
        await Game.findByIdAndDelete(gameId);
        this.listeners.forEach(l => { l.onGameDeleted(gameId); });
    }

    async getAllGamesByUser(userId: string) {
        let result: IGame[] = [];
        (await this.gameUserService.getGameIds(userId)).forEach(async (gu) => {
            result.push(await this.getGame(gu.gameid) as IGame);
        });

        return result;
    }
}