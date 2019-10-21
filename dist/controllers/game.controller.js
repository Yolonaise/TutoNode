"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const inversify_1 = require("inversify");
const game_validator_1 = require("../validators/game.validator");
const game_model_1 = __importDefault(require("../models/game.model"));
let GameController = class GameController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = game_validator_1.validateGetGame(req);
            if (error)
                return res.boom.boomify(error);
            try {
                let game = yield game_model_1.default.findById(req.params.gameId);
                return res.status(200).send({ game: game });
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = game_validator_1.validateGetGame(req);
            if (error)
                return res.boom.boomify(error);
            try {
                const result = yield new game_model_1.default(Object.assign({}, req.body)).save();
                return res.status(200).send({ game: result });
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = game_validator_1.validateUpdateGame(req);
            if (error)
                return res.boom.boomify(error);
            try {
                let result = yield game_model_1.default.findOneAndUpdate({ _id: req.params.gameId }, Object.assign({}, req.body), { new: true });
                return res.status(200).send({ game: result });
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = game_validator_1.validateDeleteGame(req);
            if (error)
                return res.boom.boomify(error);
            try {
                yield game_model_1.default.findByIdAndDelete(req.params.gameId);
                return res.status(204).send();
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
};
GameController = __decorate([
    inversify_1.injectable()
], GameController);
exports.default = GameController;
