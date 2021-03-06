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
const inversify_1 = require("inversify");
const gift_model_1 = __importDefault(require("../models/gift.model"));
const service_observer_1 = require("../interfaces/observers/service.observer");
const game_user_gift_service_1 = __importDefault(require("./game-user-gift.service"));
let GiftService = class GiftService extends service_observer_1.Observer {
    constructor(gameUserGiftService, listeners) {
        super(listeners);
        this.gameUserGiftService = gameUserGiftService;
    }
    getGift(giftId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gift_model_1.default.findById(giftId);
        });
    }
    createGift(gift) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield new gift_model_1.default(gift).save();
            this.listeners.forEach(l => { l.onGiftCreated(result); });
            return result;
        });
    }
    updateGift(giftId, gift) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield gift_model_1.default.findByIdAndUpdate(giftId, { gift }, { new: true });
            this.listeners.forEach(l => { l.onGiftUpdated(gift, result); });
            return result;
        });
    }
    deleteGift(giftId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield gift_model_1.default.findByIdAndDelete(giftId);
            this.listeners.forEach(l => { l.onGiftDeleted(giftId); });
        });
    }
    getAllGiftByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            (yield this.gameUserGiftService.getGiftIdsByUser(userId)).forEach((gug) => __awaiter(this, void 0, void 0, function* () {
                result.push(yield this.getGift(gug.giftid));
            }));
            return result;
        });
    }
    getAllGiftByGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            (yield this.gameUserGiftService.getGiftIdsByUser(gameId)).forEach((gug) => __awaiter(this, void 0, void 0, function* () {
                result.push(yield this.getGift(gug.giftid));
            }));
            return result;
        });
    }
};
GiftService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(game_user_gift_service_1.default)),
    __param(1, inversify_1.multiInject("IGiftListener")),
    __metadata("design:paramtypes", [game_user_gift_service_1.default, Array])
], GiftService);
exports.default = GiftService;
