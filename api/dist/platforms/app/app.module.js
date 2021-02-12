"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var inversify_1 = require("inversify");
var types_1 = require("./ioc/types");
var types_2 = require("../../ioc/types");
var controllers_1 = require("./controllers");
exports.appModule = new inversify_1.ContainerModule(function (bind) {
    bindRootController(bind, types_1.APP_TYPES.Controllers.Weather, controllers_1.WeatherController);
    bind(types_2.SHARED_TYPES.Server).toDynamicValue(function (context) {
        var app = express();
        app.use(bodyParser.json(), cors());
        var rootControllers = context.container.getAll(types_1.APP_TYPES.RootController);
        for (var _i = 0, rootControllers_1 = rootControllers; _i < rootControllers_1.length; _i++) {
            var controller = rootControllers_1[_i];
            var router = controller.build();
            app.use(router);
        }
        var port = process.env.PORT || 3000;
        var server = app.listen(port, function () { return console.log("API Listening on " + port + "..."); });
        bind(types_2.SHARED_TYPES.Connection).toConstantValue(server);
        return server;
    }).inSingletonScope();
});
/**
 * Permet d'ajouter dans le conteneur le controller en question ainsi que de l'ajouter aux rootcontrollers
 * @param bind Methode permettant d'ajouter des elements dans l'injecteur de dépendance
 * @param symbol Clé associée au controller
 * @param controller Le constructeur du controller (nom de classe)
 */
function bindRootController(bind, symbol, controller) {
    bind(symbol).to(controller).inSingletonScope();
    bind(types_1.APP_TYPES.RootController).toDynamicValue(function (context) {
        return context.container.get(symbol);
    });
}
