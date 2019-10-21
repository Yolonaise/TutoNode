import express from 'express';
import Boom from 'boom';
import { IGame } from '../models/game.model';

export function validateGetGame(req: express.Request) {
    if (!req.params)
        return Boom.badRequest('Request parameters are empty');

    if (!req.params)
        return Boom.badRequest('Game parameter is empty');

    return undefined;
}

export function validateCreateGame(req: express.Request) {
    let game = req.body as IGame;
    if (!game)
        return Boom.badRequest('Request body is empty');

    if (!game.name)
        return Boom.badRequest('Game must have a name');

    if (!game.price)
        return Boom.badRequest('Game must have a price');

    if (!game.admin)
        return Boom.badRequest('Game must have an admin user');

    return undefined;
}

export function validateUpdateGame(req: express.Request) {
    if (!req.params)
        return Boom.badRequest('Request parameters are empty');

    if (!req.params)
        return Boom.badRequest('Game parameter is empty');

    let game = req.body as IGame;
    if (!game)
        return Boom.badRequest('Request body is empty');

    if (!game.name)
        return Boom.badRequest('Game must have a name');

    if (!game.price)
        return Boom.badRequest('Game must have a price');

    if (!game.admin)
        return Boom.badRequest('Game must have an admin user');

    return undefined;
}

export function validateDeleteGame(req: express.Request) {
    if (!req.params)
        return Boom.badRequest('Request parameters are empty');

    if (!req.params)
        return Boom.badRequest('Game parameter is empty');

    return undefined;
}