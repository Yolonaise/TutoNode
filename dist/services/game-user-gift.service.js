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
const game_user_gift_model_1 = __importDefault(require("../models/game-user-gift.model"));
const inversify_1 = require("inversify");
let GameUserGiftService = class GameUserGiftService {
    linkGiftToUserGame(giftId, userId, gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield game_user_gift_model_1.default.exists({ giftId: giftId, gameId: gameId, userId: userId }))
                return;
            return yield new game_user_gift_model_1.default({ giftId: giftId, gameId: gameId, userId: userId }).save();
        });
    }
    unlinkGiftToUserGame(giftId, userId, gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_user_gift_model_1.default.findOneAndDelete({ giftId: giftId, gameId: gameId, userId: userId });
        });
    }
    getGiftIdsByGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_user_gift_model_1.default.find({ gameId: gameId });
        });
    }
    getGiftIdsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_user_gift_model_1.default.find({ userId: userId });
        });
    }
    onGameCreated(game) { }
    onGameUpdated(oldGame, newGame) { }
    onGameDeleted(gameId) { }
    onUserCreated(user) { }
    onUserUpdated(oldUser, newUser) { }
    onUserDeleted(userId) { }
    onGiftCreated(gift) { }
    onGiftUpdated(oldGift, newGift) { }
    onGiftDeleted(giftId) { }
};
GameUserGiftService = __decorate([
    inversify_1.injectable()
], GameUserGiftService);
exports.default = GameUserGiftService;
