"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
function validateGetGame(req) {
    if (!req.params)
        return boom_1.default.badRequest('Request parameters are empty');
    if (!req.params)
        return boom_1.default.badRequest('Game parameter is empty');
    return undefined;
}
exports.validateGetGame = validateGetGame;
function validateCreateGame(req) {
    let game = req.body;
    if (!game)
        return boom_1.default.badRequest('Request body is empty');
    if (!game.name)
        return boom_1.default.badRequest('Game must have a name');
    if (!game.price)
        return boom_1.default.badRequest('Game must have a price');
    if (!game.admin)
        return boom_1.default.badRequest('Game must have an admin user');
    return undefined;
}
exports.validateCreateGame = validateCreateGame;
function validateUpdateGame(req) {
    if (!req.params)
        return boom_1.default.badRequest('Request parameters are empty');
    if (!req.params)
        return boom_1.default.badRequest('Game parameter is empty');
    let game = req.body;
    if (!game)
        return boom_1.default.badRequest('Request body is empty');
    if (!game.name)
        return boom_1.default.badRequest('Game must have a name');
    if (!game.price)
        return boom_1.default.badRequest('Game must have a price');
    if (!game.admin)
        return boom_1.default.badRequest('Game must have an admin user');
    return undefined;
}
exports.validateUpdateGame = validateUpdateGame;
function validateDeleteGame(req) {
    if (!req.params)
        return boom_1.default.badRequest('Request parameters are empty');
    if (!req.params)
        return boom_1.default.badRequest('Game parameter is empty');
    return undefined;
}
exports.validateDeleteGame = validateDeleteGame;
