import express from 'express';
import Boom from 'boom';
import { IGame } from '../models/game.model';

export function validateGetGame(req: express.Request) {
    if (!req.params)
        throw Boom.badRequest('Request parameters are empty');

    if (!req.params)
        throw Boom.badRequest('Game parameter is empty');

}

export function validateCreateGame(req: express.Request) {
    let game = req.body as IGame;
    if (!game)
        throw Boom.badRequest('Request body is empty');

    if (!game.name)
        throw Boom.badRequest('Game must have a name');

    if (!game.price)
        throw Boom.badRequest('Game must have a price');

    if (!game.admin)
        throw Boom.badRequest('Game must have an admin user');
}

export function validateUpdateGame(req: express.Request) {
    if (!req.params)
        throw Boom.badRequest('Request parameters are empty');

    if (!req.params)
        throw Boom.badRequest('Game parameter is empty');

    let game = req.body as IGame;
    if (!game)
        throw Boom.badRequest('Request body is empty');

    if (!game.name)
        throw Boom.badRequest('Game must have a name');

    if (!game.price)
        throw Boom.badRequest('Game must have a price');

    if (!game.admin)
        throw Boom.badRequest('Game must have an admin user');
}

export function validateDeleteGame(req: express.Request) {
    if (!req.params)
        throw Boom.badRequest('Request parameters are empty');

    if (!req.params)
        throw Boom.badRequest('Game parameter is empty');
}