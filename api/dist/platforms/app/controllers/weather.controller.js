"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
var express_1 = require("express");
var inversify_1 = require("inversify");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var types_1 = require("../../../ioc/types");
var dto_1 = require("../../../definitions/dto");
var definitions_1 = require("../../../definitions");
var WeatherController = /** @class */ (function () {
    function WeatherController(weatherDAO) {
        this.weatherDAO = weatherDAO;
    }
    WeatherController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var weathers, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.weatherDAO.getAll()];
                    case 1:
                        weathers = _a.sent();
                        if (weathers instanceof Error)
                            throw weathers;
                        res.send(new definitions_1.Body(weathers));
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log("- " + new Date() + " " + err_1.message);
                        res.send(new definitions_1.Body(err_1.message, true));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WeatherController.prototype.getLast = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, weather, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.weatherDAO.getLast()];
                    case 2:
                        weather = _a.sent();
                        if (weather instanceof Error)
                            throw weather;
                        res.send(new definitions_1.Body(weather));
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        console.log("- " + new Date() + " " + err_2.message);
                        res.send(new definitions_1.Body(err_2.message, true));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WeatherController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, weatherDTO, errors, weather, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        weatherDTO = class_transformer_1.plainToClass(dto_1.WeatherDTO, body);
                        return [4 /*yield*/, class_validator_1.validate(weatherDTO)];
                    case 2:
                        errors = _a.sent();
                        if (errors.length > 0)
                            throw new Error('BAD REQUEST');
                        return [4 /*yield*/, this.weatherDAO.save(weatherDTO)];
                    case 3:
                        weather = _a.sent();
                        if (weather instanceof Error)
                            throw weather;
                        res.send(new definitions_1.Body(weather));
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        console.log("- " + new Date() + " " + err_3.message);
                        res.send(new definitions_1.Body(err_3.message, true));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WeatherController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleted, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.weatherDAO.removeById(id)];
                    case 2:
                        deleted = _a.sent();
                        if (deleted instanceof Error)
                            throw deleted;
                        res.send(new definitions_1.Body(deleted));
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        console.log("- " + new Date() + " " + err_4.message);
                        res.send(new definitions_1.Body(err_4.message, true));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WeatherController.prototype.build = function () {
        var router = express_1.Router();
        router.get("/weather/", this.getAll.bind(this));
        router.post("/weather/", this.create.bind(this));
        router.get("/weather/last", this.getLast.bind(this));
        router.delete("/weather/:id", this.delete.bind(this));
        return router;
    };
    WeatherController = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.SHARED_TYPES.DAO.Weather)),
        __metadata("design:paramtypes", [Object])
    ], WeatherController);
    return WeatherController;
}());
exports.WeatherController = WeatherController;
