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
const game_user_gift_model_1 = __importDefault(require("../models/game-user-gift.model"));
const inversify_1 = require("inversify");
const gift_service_1 = __importDefault(require("./gift.service"));
const user_service_1 = __importDefault(require("./user.service"));
const game_service_1 = __importDefault(require("./game.service"));
let GameUserGiftService = class GameUserGiftService {
    constructor(giftService, userService, gameService) {
        this.giftService = giftService;
        gameService.register(this);
        userService.register(this);
    }
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
    getGiftByGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            (yield game_user_gift_model_1.default.find({ gameId: gameId })).forEach((element) => __awaiter(this, void 0, void 0, function* () {
                let g = yield this.giftService.getGift(element.giftid);
                if (g)
                    result.push(g);
            }));
            return result;
        });
    }
    getGiftByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            (yield game_user_gift_model_1.default.find({ userId: userId })).forEach((element) => __awaiter(this, void 0, void 0, function* () {
                let g = yield this.giftService.getGift(element.giftid);
                if (g)
                    result.push(g);
            }));
            return result;
        });
    }
    onGameCreated(game) { console.log("slkfjsklfj"); }
    onGameUpdated(oldGame, newGame) { }
    onGameDeleted(gameId) { }
    onUserCreated(user) { console.log("slkfjsklfj"); }
    onUserUpdated(oldUser, newUser) { console.log("slkfjsklfj"); }
    onUserDeleted(userId) { }
};
GameUserGiftService = __decorate([
    __param(0, inversify_1.inject(gift_service_1.default)),
    __param(1, inversify_1.inject(user_service_1.default)),
    __param(2, inversify_1.inject(game_service_1.default)),
    __metadata("design:paramtypes", [gift_service_1.default,
        user_service_1.default,
        game_service_1.default])
], GameUserGiftService);
exports.default = GameUserGiftService;
