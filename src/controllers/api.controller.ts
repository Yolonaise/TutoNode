import { Request, Response } from 'express';
import Api from '../models/api.model';
import generateKey from '../utils/api.utils';
import IController from '../interfaces/controller.interface';
import { validateGetApi, validateCreateApi } from '../validators/api.validator';
import Boom from 'boom';

export default class ApiController implements IController {

    constructor() { }

    createApi(req: Request, res: Response) {
        let error = validateCreateApi(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        Api.findOne({ applicationName: req.body.applicationName }, function (err: Error, a: any) {
            if (err)
                return res.boom.internal('Internal error', err);

            if (a != undefined)
                return res.boom.conflict(`The server has already an app named ${req.body.applicationName}`);

            var key = generateKey(req.body.applicationName);
            let api = new Api({
                key: key,
                applicationName: req.body.applicationName,
                userId: req.body.userId
            });

            api.save(function (saveErr) {
                if (saveErr)
                    return res.boom.internal('Internal error', saveErr);
                else
                    return res.send({ statusCode: 200, apikey: api });
            });
        });
    }

    getApi(req: Request, res: Response) {
        let error = validateGetApi(req);
        if (error !== undefined && error instanceof Boom)
            return res.boom.boomify(error);

        Api.find({ userId: req.params.pseudo }, function (err: Error, apis: any) {
            if (err)
                return res.boom.internal('Internal error', err);

            return res.send({ statusCode: 200, apikeys: apis });
        });
    }
}