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
const user_mode_1 = __importDefault(require("../models/user.mode"));
const Boom = require("boom");
const service_observer_1 = require("../interfaces/observers/service.observer");
let UserService = class UserService extends service_observer_1.Observer {
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_mode_1.default.findById(userId);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = yield user_mode_1.default.exists({ email: user.email });
            if (u)
                throw Boom.conflict(`User with email ${user.email} already exits`);
            let result = yield new user_mode_1.default(user).save();
            this.listeners.forEach(l => { l.onUserCreated(result); });
            return result;
        });
    }
    updateUser(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield user_mode_1.default.findByIdAndUpdate(userId, Object.assign({}, user), { new: true });
            this.listeners.forEach(l => { l.onUserUpdated(user, result); });
            return result;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_mode_1.default.findByIdAndDelete(userId);
            this.listeners.forEach(l => { l.onUserDeleted(userId); });
        });
    }
};
UserService = __decorate([
    inversify_1.injectable()
], UserService);
exports.default = UserService;
