import "reflect-metadata";
import { Request, Response } from 'express';
import Api from '../models/api.model';
import generateKey from '../utils/api.utils';
import { validateGetApi, validateCreateApi, validateDeleteApi } from '../validators/api.validator';
import Boom from 'boom';
import ICrud from '../interfaces/crud.interface';
import { injectable } from 'inversify';

@injectable()
export default class ApiController implements ICrud {

    constructor() {
    }

    async get(req: Request, res: Response) {
        let error = validateGetApi(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            let apis = await Api.find({ email: req.params.email });
            return res.status(200).send({ apikeys: apis });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    async create(req: Request, res: Response) {
        let error = validateCreateApi(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            let a = await Api.findOne({ applicationName: req.body.applicationName });
            if (a != undefined)
                return res.boom.conflict(`The server has already an app named ${req.body.applicationName}`);

            const result = await new Api({ ...req.body, key: generateKey(req.body.applicationName) }).save();
            return res.status(200).send({ api: result });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    update(req: Request, res: Response) {
        return res.boom.methodNotAllowed('An api key cannot be updated');
    }

    async delete(req: Request, res: Response) {
        let error = validateDeleteApi(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            await Api.findOneAndDelete({ applicationName: req.params.applicationName, email: req.params.email });
            return res.status(204).send();
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }
}