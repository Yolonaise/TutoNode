import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import Api, { IApi } from '../models/api.model';
import { validateHeadersApi } from '../validators/api.validator';
import Boom = require('boom');

export default function interceptApi(req: Request, res: Response, next: NextFunction) {
    let error = validateHeadersApi(req);
    if (error !== undefined && error instanceof Boom)
        return res.boom.boomify(error);

    Api.findOne({ key: req.headers.apikey }, function (err: MongoError, api: IApi) {
        if (err)
            return res.boom.internal('Internal error', err);
        if (api == null)
            return res.boom.unauthorized("api is unkown");
        next();
    });
};