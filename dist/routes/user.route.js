"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
class UserRoute {
    constructor() {
        this.endpoint = '/user';
        this.controller = new user_controller_1.default();
    }
    configure() {
        const router = express_1.default.Router();
        router.use(api_interceptor_1.default);
        router.get('/:pseudo', (res, req) => this.controller.get(res, req));
        router.post('/', (res, req) => this.controller.create(res, req));
        router.put('/', (res, req) => this.controller.update(res, req));
        router.delete('/', (res, req) => this.controller.delete(res, req));
        return router;
    }
}
exports.default = UserRoute;
