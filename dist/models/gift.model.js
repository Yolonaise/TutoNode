"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const giftSchema = new mongoose_1.Schema({
    name: { type: String, required: true, max: 100 },
    link: { type: String, required: false }
});
// Export the model
const Gift = mongoose_1.model('gift', giftSchema);
exports.default = Gift;
