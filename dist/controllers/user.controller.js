"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor() { }
    get(req, res) {
        return res.boom.notImplemented('Cannot get user');
    }
    create(req, res) {
        return res.boom.notImplemented('Cannot post user');
    }
    update(req, res) {
        return res.boom.notImplemented('Cannot put user');
    }
    delete(req, res) {
        return res.boom.notImplemented('Cannot delete user');
    }
}
exports.default = UserController;
