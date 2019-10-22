"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
function validateGetGame(req) {
    if (!req.params)
        throw boom_1.default.badRequest('Request parameters are empty');
    if (!req.params)
        throw boom_1.default.badRequest('Game parameter is empty');
}
exports.validateGetGame = validateGetGame;
function validateCreateGame(req) {
    let game = req.body;
    if (!game)
        throw boom_1.default.badRequest('Request body is empty');
    if (!game.name)
        throw boom_1.default.badRequest('Game must have a name');
    if (!game.price)
        throw boom_1.default.badRequest('Game must have a price');
    if (!game.admin)
        throw boom_1.default.badRequest('Game must have an admin user');
}
exports.validateCreateGame = validateCreateGame;
function validateUpdateGame(req) {
    if (!req.params)
        throw boom_1.default.badRequest('Request parameters are empty');
    if (!req.params)
        throw boom_1.default.badRequest('Game parameter is empty');
    let game = req.body;
    if (!game)
        throw boom_1.default.badRequest('Request body is empty');
    if (!game.name)
        throw boom_1.default.badRequest('Game must have a name');
    if (!game.price)
        throw boom_1.default.badRequest('Game must have a price');
    if (!game.admin)
        throw boom_1.default.badRequest('Game must have an admin user');
}
exports.validateUpdateGame = validateUpdateGame;
function validateDeleteGame(req) {
    if (!req.params)
        throw boom_1.default.badRequest('Request parameters are empty');
    if (!req.params)
        throw boom_1.default.badRequest('Game parameter is empty');
}
exports.validateDeleteGame = validateDeleteGame;
