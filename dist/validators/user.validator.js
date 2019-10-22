"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
function validateUserGet(req) {
    if (req.params === undefined)
        throw boom_1.default.badRequest('request parameters are empty');
    if (req.params.userId === undefined)
        throw boom_1.default.badRequest('No user identity sent');
}
exports.validateUserGet = validateUserGet;
function validateUserCreate(req) {
    if (req.body === undefined)
        throw boom_1.default.badRequest('request body is empty');
    if (req.body.email === undefined)
        throw boom_1.default.badRequest('Email is empty');
    if (req.body.name === undefined)
        throw boom_1.default.badRequest('Name is empty');
}
exports.validateUserCreate = validateUserCreate;
function validateUpdateUser(req) {
    if (req.params === undefined)
        throw boom_1.default.badRequest('request parameters are empty');
    if (req.params.userId === undefined)
        throw boom_1.default.badRequest('No user identity sent');
    if (req.body.email === undefined)
        throw boom_1.default.badRequest('Email is empty');
    if (req.body.name === undefined)
        throw boom_1.default.badRequest('Name is empty');
}
exports.validateUpdateUser = validateUpdateUser;
function validateUserDelete(req) {
    if (req.params === undefined)
        throw boom_1.default.badRequest('request parameters are empty');
    if (req.params.userId === undefined)
        throw boom_1.default.badRequest('No user identity sent');
}
exports.validateUserDelete = validateUserDelete;
