"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    constructor() { }
    getStatus(req, res) {
        return res.send({ statusCode: 200, message: "Server is online" });
    }
}
exports.default = MainController;
