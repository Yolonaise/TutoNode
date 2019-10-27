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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const user_validator_1 = require("../validators/user.validator");
const inversify_1 = require("inversify");
const user_service_1 = __importDefault(require("../services/user.service"));
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user_validator_1.validateUserGet(req);
                let u = yield this.service.getUser(req.params.userId);
                return res.status(200).send(u);
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user_validator_1.validateUserCreate(req);
                let u = yield this.service.createUser(req.body);
                return res.status(200).send(u);
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user_validator_1.validateUpdateUser(req);
                let u = yield this.service.updateUser(req.params.userId, req.body);
                return res.status(200).send(u);
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user_validator_1.validateUserDelete(req);
                yield this.service.deleteUser(req.params.userId);
                return res.status(204).send();
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    getAllUserByGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.service.getAllUsersByGame(req.params.userId);
                return res.status(200).send(result);
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    enterIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Im here');
                let result = yield this.service.enterIn(req.query['email'], req.query['name']);
                return res.status(200).send(result);
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
};
UserController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(user_service_1.default)),
    __metadata("design:paramtypes", [user_service_1.default])
], UserController);
exports.default = UserController;
