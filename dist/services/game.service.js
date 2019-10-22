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
const game_model_1 = __importDefault(require("../models/game.model"));
const service_observer_1 = require("../interfaces/observers/service.observer");
let GameService = class GameService extends service_observer_1.Observer {
    getGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_model_1.default.findById(gameId);
        });
    }
    createGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield new game_model_1.default(game).save();
            this.listeners.forEach(l => { l.onGameCreated(result); });
            return result;
        });
    }
    updateGame(gameId, game) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield game_model_1.default.findByIdAndUpdate(gameId, Object.assign({}, game), { new: true });
            this.listeners.forEach(l => { l.onGameUpdated(game, result); });
            return result;
        });
    }
    deleteGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield game_model_1.default.findByIdAndDelete(gameId);
            this.listeners.forEach(l => { l.onGameDeleted(gameId); });
        });
    }
};
GameService = __decorate([
    inversify_1.injectable()
], GameService);
exports.default = GameService;
