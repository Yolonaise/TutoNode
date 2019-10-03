"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 250 },
    isRegistered: { type: Boolean, required: true }
});
// Export the model
const User = mongoose_1.model('user', userSchema);
exports.default = User;
