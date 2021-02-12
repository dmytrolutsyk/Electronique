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
exports.BaseMongooseDAO = void 0;
var mongoose_1 = require("mongoose");
var inversify_1 = require("inversify");
var BaseMongooseDAO = /** @class */ (function () {
    function BaseMongooseDAO(mongoose) {
        this.mongoose = mongoose;
    }
    BaseMongooseDAO.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var objects, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getModel().find().exec()];
                    case 1:
                        objects = _a.sent();
                        if (!objects)
                            throw new Error('CONNECTION ERROR');
                        return [2 /*return*/, objects];
                    case 2:
                        err_1 = _a.sent();
                        console.log("- " + new Date() + " " + err_1.message);
                        return [2 /*return*/, err_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseMongooseDAO.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var object, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!mongoose_1.Types.ObjectId.isValid(id.toString()))
                            throw new Error('BAD REQUEST');
                        return [4 /*yield*/, this.getModel().findById(id).exec()];
                    case 1:
                        object = _a.sent();
                        if (!object)
                            throw new Error('COULD NOT FIND OBJECT');
                        return [2 /*return*/, object];
                    case 2:
                        err_2 = _a.sent();
                        console.log("- " + new Date() + " " + err_2.message);
                        return [2 /*return*/, err_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseMongooseDAO.prototype.removeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!mongoose_1.Types.ObjectId.isValid(id.toString()))
                            throw new Error('BAD REQUEST');
                        return [4 /*yield*/, this.getModel().findByIdAndDelete(id)];
                    case 1:
                        obj = _a.sent();
                        if (!obj)
                            throw new Error('COULD NOT DELETE OBJECT');
                        return [2 /*return*/, 'DELETED'];
                    case 2:
                        err_3 = _a.sent();
                        console.log("- " + new Date() + " " + err_3.message);
                        return [2 /*return*/, err_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseMongooseDAO = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(mongoose_1.Mongoose)),
        __metadata("design:paramtypes", [mongoose_1.Mongoose])
    ], BaseMongooseDAO);
    return BaseMongooseDAO;
}());
exports.BaseMongooseDAO = BaseMongooseDAO;
