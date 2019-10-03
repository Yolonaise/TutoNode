"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_model_1 = __importDefault(require("../models/api.model"));
const api_utils_1 = __importDefault(require("../utils/api.utils"));
const api_validator_1 = require("../validators/api.validator");
const boom_1 = __importDefault(require("boom"));
class ApiController {
    constructor() { }
    createApi(req, res) {
        let error = api_validator_1.validateCreateApi(req);
        if (error !== undefined && error instanceof boom_1.default)
            return res.boom.boomify(error);
        api_model_1.default.findOne({ applicationName: req.body.applicationName }, function (err, a) {
            if (err)
                return res.boom.internal('Internal error', err);
            if (a != undefined)
                return res.boom.conflict(`The server has already an app named ${req.body.applicationName}`);
            var key = api_utils_1.default(req.body.applicationName);
            let api = new api_model_1.default({
                key: key,
                applicationName: req.body.applicationName,
                userId: req.body.userId
            });
            api.save(function (saveErr) {
                if (saveErr)
                    return res.boom.internal('Internal error', saveErr);
                else
                    return res.send({ statusCode: 200, apikey: api });
            });
        });
    }
    getApi(req, res) {
        let error = api_validator_1.validateGetApi(req);
        if (error !== undefined && error instanceof boom_1.default)
            return res.boom.boomify(error);
        api_model_1.default.find({ userId: req.params.pseudo }, function (err, apis) {
            if (err)
                return res.boom.internal('Internal error', err);
            return res.send({ statusCode: 200, apikeys: apis });
        });
    }
}
exports.default = ApiController;
