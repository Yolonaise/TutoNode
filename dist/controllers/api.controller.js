"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            let error = api_validator_1.validateCreateApi(req);
            if (error !== undefined && error instanceof boom_1.default)
                return res.boom.boomify(error);
            try {
                let a = yield api_model_1.default.findOne({ applicationName: req.body.applicationName });
                if (a != undefined)
                    return res.boom.conflict(`The server has already an app named ${req.body.applicationName}`);
                var key = api_utils_1.default(req.body.applicationName);
                let api = new api_model_1.default({
                    key: key,
                    applicationName: req.body.applicationName,
                    email: req.body.email
                });
                yield api.save();
                return res.send({ statusCode: 200, apikey: api });
            }
            catch (err) {
                return res.boom.internal('Internal error', err);
            }
        });
    }
    getApi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = api_validator_1.validateGetApi(req);
            if (error !== undefined && error instanceof boom_1.default)
                return res.boom.boomify(error);
            try {
                let apis = yield api_model_1.default.find({ userId: req.params.pseudo });
                return res.send({ statusCode: 200, apikeys: apis });
            }
            catch (err) {
                return res.boom.internal('Internal error', err);
            }
        });
    }
}
exports.default = ApiController;
