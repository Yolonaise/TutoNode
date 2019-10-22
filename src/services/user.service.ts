import { injectable } from "inversify";
import User, { IUser } from "../models/user.mode";
import Boom = require("boom");
import { Observer } from "../interfaces/observers/service.observer";
import { IUserListenner } from "../interfaces/listeners/user.service.listener";

@injectable()
export default class UserService extends Observer<IUserListenner> {

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
}