import "reflect-metadata";
import express from 'express';
import ICrud from '../interfaces/crud.interface';
import User, { IUser } from '../models/user.mode';
import { validateUserGet, validateUserCreate, validateUserDelete, validateUpdateUser } from '../validators/user.validator';
import { injectable } from 'inversify';

@injectable()
export default class UserController implements ICrud {
    constructor() {
    }

    async get(req: express.Request, res: express.Response) {
        const error = validateUserGet(req);
        if (error)
            return res.boom.boomify(error);

        try {
            let u = await User.findById(req.params.userId);
            return res.status(200).send({ user: u });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async create(req: express.Request, res: express.Response) {
        const error = validateUserCreate(req);
        if (error)
            return res.boom.boomify(error);

        try {
            let u = await User.findOne({ email: req.body.email });
            if (u)
                return res.boom.conflict(`User with email ${req.body.email} already exits`);

            const result = await new User(req.body as IUser).save();
            return res.status(200).send({ user: result });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async update(req: express.Request, res: express.Response) {
        const error = validateUpdateUser(req)
        if (error)
            return res.boom.boomify(error);

        try {
            let result = await User.findByIdAndUpdate(req.params.userId, { ...req.body }, { new: true });
            return res.status(200).send({ user: result });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        const error = validateUserDelete(req);
        if (error)
            return res.boom.boomify(error);

        try {
            await User.findByIdAndDelete(req.params.userId);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
}