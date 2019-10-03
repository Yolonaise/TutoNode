import express from 'express';
import IController from "./controller.interface";

export default interface ICrud extends IController {
    get(req: express.Request, res: express.Response): any;
    create(req: express.Request, res: express.Response): any;
    update(req: express.Request, res: express.Response): any;
    delete(req: express.Request, res: express.Response): any;
}
