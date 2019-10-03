import express from 'express';
import Boom from 'boom';

export function validateCreateApi(req: express.Request): any {
    if (req.body.userId == null)
        return Boom.badRequest('This function is available for registered account');

    if (req.body.applicationName == null)
        return Boom.badRequest('application name is missing.');

    return undefined;
}

export function validateGetApi(req: express.Request): any {
    if (req.params == null)
        return Boom.badRequest('No parameters available');

    if (req.params.pseudo == null)
        return Boom.badRequest('User parameters not found.');
}

export function validateHeadersApi(req: express.Request): any {
    if (req.headers == null)
        return Boom.unauthorized('missing headers - api interceptor');

    if (req.headers.apikey == null)
        return Boom.unauthorized('apikey cannot be null');

    return undefined;
}