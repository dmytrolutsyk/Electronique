"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Body = /** @class */ (function () {
    function Body(message, error) {
        if (error === void 0) { error = false; }
        this.message = message;
        this.error = error;
    }
    return Body;
}());
exports.Body = Body;
