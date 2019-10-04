"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const apiSchema = new mongoose_1.Schema({
    key: { type: String, required: true, max: 100 },
    applicationName: { type: String, required: true, max: 250 },
    email: { type: String, required: true }
});
// Export the model
const Api = mongoose_1.model('apiKey', apiSchema);
exports.default = Api;
