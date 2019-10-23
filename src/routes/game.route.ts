import GameController from '../controllers/game.controller';
import express from 'express';
import { IRoute } from '../interfaces/route.interface';
import { inject, injectable } from 'inversify';
import interceptApi from '../interceptors/api.interceptor';

@injectable()
export default class GameRoute implements IRoute<GameController> {
    endpoint: string = '/game';

    constructor(@inject(GameController) private controller: GameController) { }

    getController(): GameController {
        return this.controller;
    }

    configure(): express.Router {
        const router = express.Router();

        router.use(interceptApi);

        router.get('/:gameId', (req: express.Request, res: express.Response) => this.controller.get(req, res));
        router.post('/', (res: express.Request, req: express.Response) => this.controller.create(res, req));
        router.put('/:gameId', (res: express.Request, req: express.Response) => this.controller.update(res, req));
        router.delete('/:gameId', (res: express.Request, req: express.Response) => this.controller.delete(res, req));

        router.get('/:userId',  (req: express.Request, res: express.Response) => this.controller.getAllGamesByUser(req, res));
        
        return router;
    }
}