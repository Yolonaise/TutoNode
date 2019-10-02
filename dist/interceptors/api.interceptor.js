"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_model_1 = __importDefault(require("../models/api.model"));
function interceptApi(req, res, next) {
    if (req.headers == null)
        return res.boom.unauthorized('missing headers - api interceptor');
    if (req.headers.apikey == null)
        return res.boom.unauthorized('apikey cannot be null');
    api_model_1.default.findOne({ key: req.headers.apikey }, function (err, api) {
        if (err)
            return res.boom.internal('Internal error', err);
        if (api == null)
            return res.boom.unauthorized("api is not valid");
        next();
    });
}
exports.default = interceptApi;
;
