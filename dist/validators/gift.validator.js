"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
function validateGetGift(req) {
    if (!req.params)
        return boom_1.default.badRequest('Gift body is empty');
    if (!req.params.userId)
        return boom_1.default.badRequest('userId is not setted');
    return undefined;
}
exports.validateGetGift = validateGetGift;
function validateCreateGift(req) {
    if (!req.body)
        return boom_1.default.badRequest('Gift body is empty');
    if (!req.body.name)
        return boom_1.default.badRequest('gift has to be named');
    if (!req.body.userId)
        return boom_1.default.badRequest('gift must be linked to a user');
    return undefined;
}
exports.validateCreateGift = validateCreateGift;
function validateUpdateGift(req) {
    if (!req.params)
        return boom_1.default.badRequest('Gift body is empty');
    if (!req.params.giftId)
        return boom_1.default.badRequest('giftId is not setted');
    if (!req.body)
        return boom_1.default.badRequest('Gift body is empty');
    if (!req.body.name)
        return boom_1.default.badRequest('gift has to be named');
    if (!req.body.userId)
        return boom_1.default.badRequest('gift must be linked to a user');
    return undefined;
}
exports.validateUpdateGift = validateUpdateGift;
function validateDeleteGift(req) {
    if (!req.params)
        return boom_1.default.badRequest('Gift body is empty');
    if (!req.params.giftId)
        return boom_1.default.badRequest('giftId is not setted');
    return undefined;
}
exports.validateDeleteGift = validateDeleteGift;
