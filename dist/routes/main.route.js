"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_controller_1 = __importDefault(require("../controllers/main.controller"));
const express_1 = __importDefault(require("express"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
class MainRoute {
    constructor() {
        this.controller = new main_controller_1.default();
    }
    configure() {
        const router = express_1.default.Router();
        router.use(api_interceptor_1.default);
        router.get('/', (req, res) => this.controller.getStatus(req, res));
        return router;
    }
}
exports.default = MainRoute;
