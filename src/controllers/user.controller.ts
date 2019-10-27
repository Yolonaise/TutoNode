import "reflect-metadata";
import express from 'express';
import ICrud from '../interfaces/crud.interface';
import { validateUserGet, validateUserCreate, validateUserDelete, validateUpdateUser } from '../validators/user.validator';
import { injectable, inject } from 'inversify';
import UserService from "../services/user.service";

@injectable()
export default class UserController implements ICrud {
    constructor(@inject(UserService) private service: UserService) { }

    async get(req: express.Request, res: express.Response) {
        try {
            validateUserGet(req);
            let u = await this.service.getUser(req.params.userId);
            return res.status(200).send({ user: u });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            validateUserCreate(req);
            let u = await this.service.createUser(req.body);
            return res.status(200).send({ user: u });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            validateUpdateUser(req)
            let u = await this.service.updateUser(req.params.userId, req.body);
            return res.status(200).send({ user: u });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            validateUserDelete(req);
            await this.service.deleteUser(req.params.userId);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async getAllUserByGames(req: express.Request, res: express.Response) {
        try {
            let result = await this.service.getAllUsersByGame(req.params.userId);
            return res.status(200).send({ users : result });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async enterIn(req: express.Request, res: express.Response) {
        try {
            let result = await this.service.enterIn(req.params.userId, req.query['name']);
            return res.status(200).send({ users : result });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
}