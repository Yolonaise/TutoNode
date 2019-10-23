import GameUserGift from "../models/game-user-gift.model";
import { injectable } from "inversify";
import { IGift } from "../models/gift.model";
import { IGameListenner } from "../interfaces/listeners/game.service.listener";
import { IGame } from "../models/game.model";
import { IUserListenner } from "../interfaces/listeners/user.service.listener";
import { IUser } from "../models/user.mode";
import { IGiftListenner } from "../interfaces/listeners/gift.service.listener";

@injectable()
export default class GameUserGiftService implements IGameListenner, IUserListenner, IGiftListenner {

    async linkGiftToUserGame(giftId: string, userId: string, gameId: string) {
        if (await GameUserGift.exists({ giftId: giftId, gameId: gameId, userId: userId }))
            return;

        return await new GameUserGift({ giftId: giftId, gameId: gameId, userId: userId }).save();
    }

    async unlinkGiftToUserGame(giftId: string, userId: string, gameId: string) {
        return await GameUserGift.findOneAndDelete({ giftId: giftId, gameId: gameId, userId: userId });
    }

    async getGiftIdsByGame(gameId: string) {
        return await GameUserGift.find({ gameId: gameId });
    }

    async getGiftIdsByUser(userId: string) {
        return await GameUserGift.find({ userId: userId });
    }

    onGameCreated(game: IGame) { }
    onGameUpdated(oldGame: IGame, newGame: IGame) { }
    onGameDeleted(gameId: string) { }

    onUserCreated(user: IUser) { }
    onUserUpdated(oldUser: IUser, newUser: IUser) { }
    onUserDeleted(userId: string) { }

    onGiftCreated(gift: IGift) { }
    onGiftUpdated(oldGift: IGift, newGift: IGift) { }
    onGiftDeleted(giftId: string) { }
}
