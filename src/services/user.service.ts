import { injectable } from "inversify";
import User, { IUser } from "../models/user.mode";
import Boom = require("boom");

@injectable()
export default class UserService {

    async getUser(userId: string) {
        return await User.findById(userId);
    }

    async createUser(user: IUser) {
        let u = await User.exists({ email: user.email });
        if (u)
            throw Boom.conflict(`User with email ${user.email} already exits`);

        return await new User(user).save();
    }

    async updateUser(userId: string, user: IUser) {
        return await User.findByIdAndUpdate(userId, { ...user }, { new: true });
    }

    async deleteUser(userId: string) {
        return await User.findByIdAndDelete(userId);
    }
}