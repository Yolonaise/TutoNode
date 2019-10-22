import GameUser from "../models/game-user.model";
import { IUser } from "../models/user.mode";
import { injectable, inject } from "inversify";
import UserService from "./user.service";
import GameService from "./game.service";
import { IGame } from "../models/game.model";

@injectable()
export default class GameUserService {

    constructor(
        @inject(UserService) private userService: UserService,
        @inject(GameService) private gameService: GameService) { }

    async linkUserToGame(userId: string, gameId: string) {
        if (await GameUser.exists({ gameId: gameId, userId: userId }))
            return;

        return await new GameUser({ gameId: gameId, userId: userId }).save();
    }

    async unlinkUserToGame(userId: string, gameId: string) {
        if (!await GameUser.exists({ gameId: gameId, userId: userId }))
            return;

        return await GameUser.findOneAndDelete({ gameId: gameId, userId: userId });
    }

    async getUsers(gameId: string) {
        const result: IUser[] = [];
        (await GameUser.find({ gameId: gameId })).forEach(async (element) => {
            let u = await this.userService.getUser(element.userid);
            if (u) {
                result.push(u);
            }
        });

        return result;
    }

    async getGames(userId: string) {
        let result: IGame[] = [];

        (await GameUser.find({ userId: userId })).forEach(async (element) => {
            let u = await this.gameService.getGame(element.gameid);
            if (u) {
                result.push(u);
            }
        });

        return result;
    }
}