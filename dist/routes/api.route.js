"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_controller_1 = __importDefault(require("../controllers/api.controller"));
const express_1 = __importDefault(require("express"));
const api_interceptor_1 = __importDefault(require("../interceptors/api.interceptor"));
class ApiRoute {
    constructor() {
        this.endpoint = '/api';
        this.controller = new api_controller_1.default();
    }
    configure() {
        const router = express_1.default.Router();
        router.use(api_interceptor_1.default);
        router.get('/:email', (req, res) => this.controller.get(req, res));
        router.post('/', (res, req) => this.controller.create(res, req));
        router.put('/', (res, req) => this.controller.update(res, req));
        router.delete('/:email/:applicationName', (res, req) => this.controller.delete(res, req));
        return router;
    }
}
exports.default = ApiRoute;
