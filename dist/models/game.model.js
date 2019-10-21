"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const gameSchema = new mongoose_1.Schema({
    name: { type: String, required: true, max: 100 },
    admin: { type: String, required: true, max: 250 },
    price: { type: Number, required: true }
});
// Export the model
const Game = mongoose_1.model('game', gameSchema);
exports.default = Game;
