"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_model_1 = __importDefault(require("../models/api.model"));
const api_validator_1 = require("../validators/api.validator");
const Boom = require("boom");
function interceptApi(req, res, next) {
    let error = api_validator_1.validateHeadersApi(req);
    if (error !== undefined && error instanceof Boom)
        return res.boom.boomify(error);
    api_model_1.default.findOne({ key: req.headers.apikey }, function (err, api) {
        if (err)
            return res.boom.internal('Internal error', err);
        if (api == null)
            return res.boom.unauthorized("api is unkown");
        next();
    });
}
exports.default = interceptApi;
;
