import express from 'express'
import Boom from 'boom'

export function validateUserGet(req: express.Request) {
    if (req.params === undefined)
        return Boom.badRequest('request parameters are empty');

    if (req.params.email === undefined)
        return Boom.badRequest('Parameters email is empty');

    return undefined;
}

export function validateUserCreate(req: express.Request) {
    if (req.body === undefined)
        return Boom.badRequest('request body is empty');

    if (req.body.email === undefined)
        return Boom.badRequest('Email is empty');

    if (req.body.name === undefined)
        return Boom.badRequest('Name is empty');

    return undefined;
}