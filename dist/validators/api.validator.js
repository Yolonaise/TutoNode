"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
function validateCreateApi(req) {
    if (req.body.email == null)
        return boom_1.default.badRequest('This function is available for registered account');
    if (req.body.applicationName == null)
        return boom_1.default.badRequest('application name is missing.');
    return undefined;
}
exports.validateCreateApi = validateCreateApi;
function validateGetApi(req) {
    if (req.params == null)
        return boom_1.default.badRequest('No parameters available');
    if (req.params.email == null)
        return boom_1.default.badRequest('Email parameters not found.');
    return undefined;
}
exports.validateGetApi = validateGetApi;
function validateHeadersApi(req) {
    if (req.headers == null)
        return boom_1.default.unauthorized('missing headers - api interceptor');
    if (req.headers.apikey == null)
        return boom_1.default.unauthorized('apikey cannot be null');
    return undefined;
}
exports.validateHeadersApi = validateHeadersApi;
function validateDeleteApi(req) {
    if (req.params == null)
        return boom_1.default.badRequest('No parameters available');
    if (req.params.email == null)
        return boom_1.default.badRequest('Email parameters not found.');
    if (req.params.applicationName == null)
        return boom_1.default.badRequest('application name parameters not found.');
    return undefined;
}
exports.validateDeleteApi = validateDeleteApi;
