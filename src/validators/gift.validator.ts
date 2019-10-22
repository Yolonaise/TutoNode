import express from 'express';
import Boom from 'boom';

export function validateGetGift(req: express.Request) {
    if (!req.params)
        throw Boom.badRequest('Gift body is empty');

    if (!req.params.giftId)
        throw Boom.badRequest('userId is not setted');
}

export function validateCreateGift(req: express.Request) {
    if (!req.body)
        throw Boom.badRequest('Gift body is empty');

    if (!req.body.name)
        throw Boom.badRequest('gift has to be named');
}

export function validateUpdateGift(req: express.Request) {
    if (!req.params)
        throw Boom.badRequest('Gift body is empty');

    if (!req.params.giftId)
        throw Boom.badRequest('giftId is not setted');

    if (!req.body)
        throw Boom.badRequest('Gift body is empty');

    if (!req.body.name)
        throw Boom.badRequest('gift has to be named');
}

export function validateDeleteGift(req: express.Request) {
    if (!req.params)
        throw Boom.badRequest('Gift body is empty');

    if (!req.params.giftId)
        throw Boom.badRequest('giftId is not setted');
}