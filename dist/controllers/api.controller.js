"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
require("reflect-metadata");
const api_model_1 = __importDefault(require("../models/api.model"));
const api_utils_1 = __importDefault(require("../utils/api.utils"));
const api_validator_1 = require("../validators/api.validator");
const boom_1 = __importDefault(require("boom"));
const inversify_1 = require("inversify");
let ApiController = class ApiController {
    constructor() { }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = api_validator_1.validateGetApi(req);
            if (error !== undefined && error instanceof boom_1.default)
                return res.boom.boomify(error);
            try {
                let apis = yield api_model_1.default.find({ email: req.params.email });
                return res.status(200).send({ apikeys: apis });
            }
            catch (err) {
                return res.boom.internal('Internal error', err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = api_validator_1.validateCreateApi(req);
            if (error !== undefined && error instanceof boom_1.default)
                return res.boom.boomify(error);
            try {
                let a = yield api_model_1.default.findOne({ applicationName: req.body.applicationName });
                if (a != undefined)
                    return res.boom.conflict(`The server has already an app named ${req.body.applicationName}`);
                const result = yield new api_model_1.default(Object.assign(Object.assign({}, req.body), { key: api_utils_1.default(req.body.applicationName) })).save();
                return res.status(200).send({ api: result });
            }
            catch (err) {
                return res.boom.internal('Internal error', err);
            }
        });
    }
    update(req, res) {
        return res.boom.methodNotAllowed('An api key cannot be updated');
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = api_validator_1.validateDeleteApi(req);
            if (error !== undefined && error instanceof boom_1.default)
                return res.boom.boomify(error);
            try {
                yield api_model_1.default.findOneAndDelete({ applicationName: req.params.applicationName, email: req.params.email });
                return res.status(204).send();
            }
            catch (err) {
                return res.boom.internal('Internal error', err);
            }
        });
    }
};
ApiController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ApiController);
exports.default = ApiController;
