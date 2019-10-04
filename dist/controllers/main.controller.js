"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    constructor() { }
    getStatus(req, res) {
        return res.status(200).send({ message: 'Server is online' });
    }
}
exports.default = MainController;
