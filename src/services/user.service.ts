import { injectable, multiInject, inject } from "inversify";
import User, { IUser } from "../models/user.mode";
import Boom from 'boom';
import { Observer } from "../interfaces/observers/service.observer";
import { IUserListenner } from "../interfaces/listeners/user.service.listener";
import GameUserService from "./game-user.service";

@injectable()
export default class UserService extends Observer<IUserListenner> {

    constructor(
        @inject(GameUserService) private gameUserService: GameUserService,
        @multiInject("IUserListener") listeners: IUserListenner[]) {
        super(listeners);
    }

    async getUser(userId: string) {
        return await User.findById(userId);
    }

    async createUser(user: IUser) {
        let u = await User.exists({ email: user.email });
        if (u)
            throw Boom.conflict(`User with email ${user.email} already exits`);

        let result = await new User(user).save();
        this.listeners.forEach(l => { l.onUserCreated(result as IUser); });

        return result;
    }

    async updateUser(userId: string, user: IUser) {
        let result = await User.findByIdAndUpdate(userId, { ...user }, { new: true });
        this.listeners.forEach(l => { l.onUserUpdated(user, result as IUser); });

        return result;
    }

    async deleteUser(userId: string) {
        await User.findByIdAndDelete(userId);
        this.listeners.forEach(l => { l.onUserDeleted(userId); });
    }

    async getAllUsersByGame(gameid: string) {
        let result: IUser[] = [];
        (await this.gameUserService.getGameIds(gameid)).forEach(async (gu) => {
            result.push(await this.getUser(gu.gameid) as IUser);
        });

        return result;
    }
}