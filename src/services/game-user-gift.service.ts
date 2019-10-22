import GameUserGift from "../models/game-user-gift.model";
import { inject } from "inversify";
import GiftService from "./gift.service";
import { IGift } from "../models/gift.model";
import UserService from "./user.service";
import GameService from "./game.service";
import { IGameListenner } from "../interfaces/listeners/game.service.listener";
import { IGame } from "../models/game.model";
import { IUserListenner } from "../interfaces/listeners/user.service.listener";
import { IUser } from "../models/user.mode";

export default class GameUserGiftService implements IGameListenner, IUserListenner{
    
    constructor(
        @inject(GiftService) private giftService: GiftService,
        @inject(UserService) userService: UserService,
        @inject(GameService) gameService: GameService) {
            gameService.register(this);
            userService.register(this);
        }

    async linkGiftToUserGame(giftId: string, userId: string, gameId:string) {
        if(await GameUserGift.exists({ giftId: giftId, gameId: gameId, userId: userId }))
            return;
        
        return await new GameUserGift({ giftId: giftId, gameId: gameId, userId: userId }).save();
    }
    
    async unlinkGiftToUserGame(giftId: string, userId: string, gameId:string) {
        return await GameUserGift.findOneAndDelete({ giftId: giftId, gameId: gameId, userId: userId });
    }

    async getGiftByGame(gameId: string){
        let result : IGift[] = [];
        
        (await GameUserGift.find({ gameId: gameId })).forEach(async (element) => {
            let g = await this.giftService.getGift(element.giftid);
            if(g)
                result.push(g);
        });

        return result;
    }

    async getGiftByUser(userId: string){
        let result : IGift[] = [];
        
        (await GameUserGift.find({ userId: userId })).forEach(async (element) => {
            let g = await this.giftService.getGift(element.giftid);
            if(g)
                result.push(g);
        });

        return result;
    }

    onGameCreated(game: IGame) {console.log("slkfjsklfj");}
    onGameUpdated(oldGame: IGame, newGame: IGame) { }
    onGameDeleted(gameId: string) {}

    onUserCreated(user: IUser) {console.log("slkfjsklfj");}
    onUserUpdated(oldUser: IUser, newUser: IUser) {console.log("slkfjsklfj");}
    onUserDeleted(userId: string) {}
}
