"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherModel = exports.WeatherSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose = require("mongoose");
exports.WeatherSchema = new mongoose_1.Schema({
    temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
exports.WeatherModel = mongoose.model('Weather', exports.WeatherSchema);
