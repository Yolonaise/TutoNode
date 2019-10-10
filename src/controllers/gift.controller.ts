import ICrud from '../interfaces/crud.interface';
import express from 'express';
import { injectable } from 'inversify';

@injectable()
export default class GiftController implements ICrud {
    
    constructor() {}

    get(req: express.Request, res: express.Response) {
        throw new Error('Method not implemented.');
    }
    
    create(req: express.Request, res: express.Response) {
        throw new Error('Method not implemented.');
    }
    
    update(req: express.Request, res: express.Response) {
        throw new Error('Method not implemented.');
    }
    
    delete(req: express.Request, res: express.Response) {
        throw new Error('Method not implemented.');
    }
}