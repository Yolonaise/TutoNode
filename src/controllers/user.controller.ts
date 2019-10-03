import express from 'express';
import ICrud from '../interfaces/crud.interface';

export default class UserController implements ICrud {
    constructor() { }

    get(req: express.Request, res: express.Response) {
        return res.boom.notImplemented('Cannot get user');
    }
    create(req: express.Request, res: express.Response) {
        return res.boom.notImplemented('Cannot post user');
    }
    update(req: express.Request, res: express.Response) {
        return res.boom.notImplemented('Cannot put user');
    }
    delete(req: express.Request, res: express.Response) {
        return res.boom.notImplemented('Cannot delete user');
    }
}