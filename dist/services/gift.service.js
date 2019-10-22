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
const gift_model_1 = __importDefault(require("../models/gift.model"));
let GiftService = class GiftService {
    getGift(giftId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gift_model_1.default.findById(giftId);
        });
    }
    createGift(gift) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new gift_model_1.default(gift).save();
        });
    }
    updateGift(giftId, gift) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gift_model_1.default.findByIdAndUpdate(giftId, { gift }, { new: true });
        });
    }
    deleteGift(giftId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gift_model_1.default.findByIdAndDelete(giftId);
        });
    }
};
GiftService = __decorate([
    inversify_1.injectable()
], GiftService);
exports.default = GiftService;
