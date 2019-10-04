import express from 'express';
import IController from '../interfaces/controller.interface';

export default class MainController implements IController {
    constructor() { }

    getStatus(req: express.Request, res: express.Response) {
        return res.status(200).send({ message: 'Server is online' });
    }
}