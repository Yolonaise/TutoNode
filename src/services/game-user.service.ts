import GameUser from "../models/game-user.model";
import { IUser } from "../models/user.mode";
import { injectable } from "inversify";
import { IGame } from "../models/game.model";
import { IGameListenner } from "../interfaces/listeners/game.service.listener";
import { IUserListenner } from "../interfaces/listeners/user.service.listener";

@injectable()
export default class GameUserService implements IGameListenner, IUserListenner {

    constructor() { }

    async linkUserToGame(userId: string, gameId: string) {
        if (await GameUser.exists({ gameId: gameId, userId: userId }))
            return;

        return await new GameUser({ gameId: gameId, userId: userId }).save();
    }

    async unlinkUserToGame(userId: string, gameId: string) {
        return await GameUser.findOneAndDelete({ gameId: gameId, userId: userId });
    }

    async getUserIds(gameId: string) {
        return await GameUser.find({ gameId: gameId });
    }

    async getGameIds(userId: string) {
        return await GameUser.find({ userId: userId })
    }

    onUserCreated(user: IUser) { }
    onUserUpdated(oldUser: IUser, newUser: IUser) { }
    onUserDeleted(userId: string) { }

    onGameCreated(game: IGame) { }
    onGameUpdated(oldGame: IGame, newGame: IGame) { }
    onGameDeleted(gameId: string) { }
}