import ICrud from '../interfaces/crud.interface';
import express from 'express';
import { injectable, inject } from 'inversify';
import { validateGetGift, validateDeleteGift, validateCreateGift, validateUpdateGift } from '../validators/gift.validator';
import Gift from '../models/gift.model';
import GiftService from '../services/gift.service';

@injectable()
export default class GiftController implements ICrud {

    constructor(@inject(GiftService) private service: GiftService) { }

    async get(req: express.Request, res: express.Response) {
        try {
            validateGetGift(req);
            const gift = await this.service.getGift(req.params.userId);
            return res.status(200).send({ gifts: gift });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async create(req: express.Request, res: express.Response) {
        try {
            validateCreateGift(req);
            const gift = this.service.createGift(req.body);
            return res.status(200).send({ gift: gift });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async update(req: express.Request, res: express.Response) {
        try {
            validateUpdateGift(req);
            let gift = this.service.updateGift(req.params.giftId, req.body);
            return res.status(200).send({ gift: gift });
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        try {
            validateDeleteGift(req);
            await this.service.deleteGift(req.params.giftId);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }

    async getAllGiftByUser(req: express.Request, res: express.Response) {
        try {
            await this.service.getAllGiftByUser(req.params.userId);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
    
    async getAllGiftByGame(req: express.Request, res: express.Response) {
        try {
            await this.service.getAllGiftByUser(req.params.gameId);
            return res.status(204).send();
        } catch (err) {
            return res.boom.boomify(err);
        }
    }
}