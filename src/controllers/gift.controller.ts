import ICrud from '../interfaces/crud.interface';
import express from 'express';
import { injectable } from 'inversify';
import { validateGetGift, validateDeleteGift, validateCreateGift, validateUpdateGift } from '../validators/gift.validator';
import Gift from '../models/gift.model';

@injectable()
export default class GiftController implements ICrud {

    constructor() { }

    async get(req: express.Request, res: express.Response) {
        const error = validateGetGift(req)
        if (error)
            return res.boom.boomify(error);

        try {
            const result = await Gift.find({ userId: req.params.userId });
            return res.status(200).send({ gifts: result });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    async create(req: express.Request, res: express.Response) {
        const error = validateCreateGift(req);
        if (error)
            return res.boom.boomify(error);

        try {
            const result = await new Gift({ ...req.body }).save();
            return res.status(200).send({ gift: result });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    async update(req: express.Request, res: express.Response) {
        const error = validateUpdateGift(req)
        if (error)
            return res.boom.boomify(error);

        try {
            let result = await Gift.findOneAndUpdate({ _id: req.params.giftId }, { ...req.body }, { new: true });
            return res.status(200).send({ gift: result });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    async delete(req: express.Request, res: express.Response) {
        const error = validateDeleteGift(req)
        if (error)
            return res.boom.boomify(error);

        try {
            await Gift.findOneAndDelete({ _id: req.params.giftId });
            return res.status(204).send();
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }
}