import { Request, Response } from 'express';
import Api from '../models/api.model';
import generateKey from '../utils/api.utils';

export default class ApiController {

    constructor() { }

    createApi(req: Request, res: Response) {
        if (req.body.userId == null)
            return res.boom.badRequest('This function is available for registered account');

        if (req.body.applicationName == null)
            return res.boom.badRequest('application name is missing.');

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
                    return res.send({ status: 200, apikey: api });
            });
        });
    }

    getApi(req: Request, res: Response) {
        if (req.params == null)
            return res.boom.badRequest('No parameters available');

        if (req.params.pseudo == null)
            return res.boom.badRequest('User parameters not found.');

        Api.find({ userId: req.params.pseudo }, function (err: Error, apis: any) {
            if (err)
                return res.boom.internal('Internal error', err);

            return res.send({ status: 200, apikeys: apis });
        });
    }
}