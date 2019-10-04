import { Request, Response } from 'express';
import Api from '../models/api.model';
import generateKey from '../utils/api.utils';
import IController from '../interfaces/controller.interface';
import { validateGetApi, validateCreateApi } from '../validators/api.validator';
import Boom from 'boom';
import ICrud from '../interfaces/crud.interface';

export default class ApiController implements ICrud {

    constructor() { }

    async get(req: Request, res: Response) {
        let error = validateGetApi(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            let apis = await Api.find({ email: req.params.email });
            return res.send({ statusCode: 200, apikeys: apis });
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

            var key = generateKey(req.body.applicationName);
            let api = new Api({
                key: key,
                applicationName: req.body.applicationName,
                email: req.body.email
            });

            await api.save();
            return res.send({ statusCode: 200, api: api });
        } catch (err) {
            console.log(err);
            return res.boom.internal('Internal error', err);
        }
    }

    async update(req: Request, res: Response) {
        let error = validateGetApi(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        try {
            let apis = await Api.find({ userId: req.params.pseudo });
            return res.send({ statusCode: 200, apikeys: apis });
        } catch (err) {
            return res.boom.internal('Internal error', err);
        }
    }

    delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}