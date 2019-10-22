import { IUser } from "../../models/user.mode";

export interface IUserListenner {
    onUserCreated(user: IUser): any;
    onUserUpdated(oldUser: IUser, newUser: IUser): any;
    onUserDeleted(userId: string): any;
} 