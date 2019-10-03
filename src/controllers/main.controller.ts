import express from 'express';
import IController from '../interfaces/controller.interface';

export default class MainController implements IController {
    constructor() { }

    getStatus(req: express.Request, res: express.Response) {
        return res.send({ statusCode: 200, message: 'Server is online' });
    }
}