import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongodb';
import Api, { IApi } from '../models/api.model';

export default function interceptApi(req: Request, res: Response, next: NextFunction) {
    if (req.headers == null)
        return res.boom.unauthorized('missing headers - api interceptor');

    if (req.headers.apikey == null)
        return res.boom.unauthorized('apikey cannot be null');

    Api.findOne({ key: req.headers.apikey }, function (err: MongoError, api: IApi) {
        if (err)
            return res.boom.internal('Internal error', err);
        if (api == null)
            return res.boom.unauthorized("api is not valid");
        next();
    });
};