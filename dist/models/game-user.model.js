"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const GameUserSchema = new mongoose_1.Schema({
    gameid: { type: String, required: true },
    userid: { type: String, required: true }
});
// Export the model
const GameUser = mongoose_1.model('gameUser', GameUserSchema);
exports.default = GameUser;
