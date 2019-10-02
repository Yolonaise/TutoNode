"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateKey(appName) {
    var index = Math.floor((Math.random() * 999999999) + 1);
    return appName + index;
}
exports.default = generateKey;
