import express from 'express'
import Boom from 'boom'

export function validateUserGet(req: express.Request) {
    if (req.params === undefined)
        throw Boom.badRequest('request parameters are empty');

    if (req.params.userId === undefined)
        throw Boom.badRequest('No user identity sent');
}

export function validateUserCreate(req: express.Request) {
    if (req.body === undefined)
        throw Boom.badRequest('request body is empty');

    if (req.body.email === undefined)
        throw Boom.badRequest('Email is empty');

    if (req.body.name === undefined)
        throw Boom.badRequest('Name is empty');
}

export function validateUpdateUser(req: express.Request) {
    if (req.params === undefined)
        throw Boom.badRequest('request parameters are empty');

    if (req.params.userId === undefined)
        throw Boom.badRequest('No user identity sent');

    if (req.body.email === undefined)
        throw Boom.badRequest('Email is empty');

    if (req.body.name === undefined)
        throw Boom.badRequest('Name is empty');
}

export function validateUserDelete(req: express.Request) {
    if (req.params === undefined)
        throw Boom.badRequest('request parameters are empty');

    if (req.params.userId === undefined)
        throw Boom.badRequest('No user identity sent');
}