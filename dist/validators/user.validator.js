"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
function validateUserGet(req) {
    if (req.params === undefined)
        return boom_1.default.badRequest('request parameters are empty');
    if (req.params.email === undefined)
        return boom_1.default.badRequest('Parameters email is empty');
    return undefined;
}
exports.validateUserGet = validateUserGet;
function validateUserCreate(req) {
    if (req.body === undefined)
        return boom_1.default.badRequest('request body is empty');
    if (req.body.email === undefined)
        return boom_1.default.badRequest('Email is empty');
    if (req.body.name === undefined)
        return boom_1.default.badRequest('Name is empty');
    return undefined;
}
exports.validateUserCreate = validateUserCreate;
