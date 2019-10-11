import "reflect-metadata";
import express from 'express';
import ICrud from '../interfaces/crud.interface';
import User, { IUser } from '../models/user.mode';
import { validateUserGet, validateUserCreate } from '../validators/user.validator';
import Boom from 'boom';
import { injectable, multiInject } from 'inversify';
import { ICrudObserver, ICrudListenner } from "../interfaces/crud-listenner.interface";

@injectable()
export default class UserController implements ICrud, ICrudObserver {
    listenners: ICrudListenner[];

    constructor(@multiInject('IUserListenner') listenners: ICrudListenner[]) {
        this.listenners = listenners;
    }

    async get(req: express.Request, res: express.Response) {
        let error = validateUserGet(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            let u = await User.findOne({ email: req.params.email });
            return res.status(200).send({ user: u });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    async create(req: express.Request, res: express.Response) {
        let error = validateUserCreate(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            let u = await User.findOne({ email: req.body.email });
            if (u)
                return res.boom.conflict(`User with email ${req.body.email} already exits`);

            const result = await new User(req.body as IUser).save();
            return res.status(200).send({ user: result });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    async update(req: express.Request, res: express.Response) {
        return res.boom.notImplemented('Cannot put user');
    }

    async delete(req: express.Request, res: express.Response) {
        return res.boom.notImplemented('Cannot delete user');
    }

    notifyGet(): void {
        throw new Error("Method not implemented.");
    }
    notifyCreate(): void {
        throw new Error("Method not implemented.");
    }
    notifyDelete(): void {
        throw new Error("Method not implemented.");
    }
    notifyUpdate(): void {
        throw new Error("Method not implemented.");
    }
}