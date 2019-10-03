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
        router.get('/:email', (req, res) => this.controller.get(req, res));
        router.post('/', (req, res) => this.controller.create(req, res));
        router.put('/', (req, res) => this.controller.update(req, res));
        router.delete('/', (req, res) => this.controller.delete(req, res));
        return router;
    }
}
exports.default = UserRoute;
