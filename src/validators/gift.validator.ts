
import express from 'express'
import Boom from 'boom'

export function validateGetGift(req: express.Request) {
    if (!req.params)
        return Boom.badRequest('Gift body is empty');

    if (!req.params.userId)
        return Boom.badRequest('userId is not setted');

    return undefined;
}

export function validateCreateGift(req: express.Request) {
    if (!req.body)
        return Boom.badRequest('Gift body is empty');

    if (!req.body.name)
        return Boom.badRequest('gift has to be named');

    if (!req.body.userId)
        return Boom.badRequest('gift must be linked to a user');

    return undefined;
}

export function validateUpdateGift(req: express.Request) {
    if (!req.params)
        return Boom.badRequest('Gift body is empty');

    if (!req.params.giftId)
        return Boom.badRequest('giftId is not setted');

    if (!req.body)
        return Boom.badRequest('Gift body is empty');

    if (!req.body.name)
        return Boom.badRequest('gift has to be named');

    if (!req.body.userId)
        return Boom.badRequest('gift must be linked to a user');

    return undefined;
}

export function validateDeleteGift(req: express.Request) {
    if (!req.params)
        return Boom.badRequest('Gift body is empty');

    if (!req.params.giftId)
        return Boom.badRequest('giftId is not setted');

    return undefined;
}