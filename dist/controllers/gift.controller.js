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
const inversify_1 = require("inversify");
const gift_validator_1 = require("../validators/gift.validator");
const gift_model_1 = __importDefault(require("../models/gift.model"));
let GiftController = class GiftController {
    constructor() { }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = gift_validator_1.validateGetGift(req);
            if (error)
                return res.boom.boomify(error);
            try {
                const result = yield gift_model_1.default.find({ userId: req.params.userId });
                return res.status(200).send({ gifts: result });
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = gift_validator_1.validateCreateGift(req);
            if (error)
                return res.boom.boomify(error);
            try {
                const result = yield new gift_model_1.default(Object.assign({}, req.body)).save();
                return res.status(200).send({ gift: result });
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = gift_validator_1.validateUpdateGift(req);
            if (error)
                return res.boom.boomify(error);
            try {
                let result = yield gift_model_1.default.findOneAndUpdate({ _id: req.params.giftId }, Object.assign({}, req.body), { new: true });
                return res.status(200).send({ gift: result });
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = gift_validator_1.validateDeleteGift(req);
            if (error)
                return res.boom.boomify(error);
            try {
                yield gift_model_1.default.findOneAndDelete({ _id: req.params.giftId });
                return res.status(204).send();
            }
            catch (err) {
                return res.boom.boomify(err);
            }
        });
    }
};
GiftController = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], GiftController);
exports.default = GiftController;
