"use strict";
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
const user_mode_1 = __importDefault(require("../models/user.mode"));
const user_validator_1 = require("../validators/user.validator");
const boom_1 = __importDefault(require("boom"));
class UserController {
    constructor() { }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = user_validator_1.validateUserGet(req);
            if (error !== undefined && error instanceof boom_1.default)
                return res.boom.boomify(error);
            try {
                let u = yield user_mode_1.default.findOne({ email: req.params.email });
                return res.send({ statusCode: 200, user: u });
            }
            catch (err) {
                return res.boom.internal('Internal error', err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = user_validator_1.validateUserCreate(req);
            if (error !== undefined && error instanceof boom_1.default)
                return res.boom.boomify(error);
            try {
                let u = yield user_mode_1.default.findOne({ email: req.body.email });
                if (u)
                    return res.boom.conflict(`User with email ${req.body.email} already exits`);
                const createUser = new user_mode_1.default(req.body);
                const result = yield createUser.save();
                return res.send({ statusCode: 200, user: result });
            }
            catch (err) {
                return res.boom.internal('Internal error', err);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.boom.notImplemented('Cannot put user');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.boom.notImplemented('Cannot delete user');
        });
    }
}
exports.default = UserController;
