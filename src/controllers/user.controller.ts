import express from 'express';
import ICrud from '../interfaces/crud.interface';
import User, { IUser } from '../models/user.mode';
import { validateUserGet, validateUserCreate } from '../validators/user.validator';
import Boom from 'boom';
import { userInfo } from 'os';

export default class UserController implements ICrud {
    constructor() { }

    async get(req: express.Request, res: express.Response) {
        let error = validateUserGet(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            let u = await User.findOne({ email: req.params.email });
            return res.send({ statusCode: 200, user: u });
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
            const createUser = new User(req.body as IUser);
            const result = await createUser.save();

            return res.send({ statusCode: 200, user: result });
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
}