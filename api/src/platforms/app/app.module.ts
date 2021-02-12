import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { ContainerModule, interfaces}  from "inversify";
import * as http from "http";

import { APP_TYPES } from './ioc/types';
import { SHARED_TYPES } from '../../ioc/types';
import { Connection } from '../../definitions';
import { WeatherController } from './controllers';

export const appModule = new ContainerModule((bind: interfaces.Bind) => {

    bindRootController(bind, APP_TYPES.Controllers.Weather, WeatherController);

    bind<http.Server>(SHARED_TYPES.Server).toDynamicValue((context: interfaces.Context) => {
        const app = express();
        app.use(bodyParser.json(), cors()); 
        const rootControllers: any[] = context.container.getAll(APP_TYPES.RootController);
        for(const controller of rootControllers) {
            const router = controller.build();
            app.use(router); 
        }
        const port = process.env.PORT || 3000;
        const server = app.listen(port, () => console.log(`API Listening on ${port}...`));
        bind<Connection>(SHARED_TYPES.Connection).toConstantValue(server);
        return server;
    }).inSingletonScope();
});

/**
 * Permet d'ajouter dans le conteneur le controller en question ainsi que de l'ajouter aux rootcontrollers
 * @param bind Methode permettant d'ajouter des elements dans l'injecteur de dépendance
 * @param symbol Clé associée au controller
 * @param controller Le constructeur du controller (nom de classe)
 */
function bindRootController(bind: interfaces.Bind, symbol: symbol, controller: any): void {
    bind(symbol).to(controller).inSingletonScope();
    bind(APP_TYPES.RootController).toDynamicValue((context: interfaces.Context) => {
        return context.container.get(symbol);
    });
}