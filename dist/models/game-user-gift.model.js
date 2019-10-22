"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const GameUserGiftSchema = new mongoose_1.Schema({
    gameid: { type: String, required: true },
    userid: { type: String, required: true },
    giftid: { type: String, required: true }
});
// Export the model
const GameUserGift = mongoose_1.model('gameUser', GameUserGiftSchema);
exports.default = GameUserGift;
