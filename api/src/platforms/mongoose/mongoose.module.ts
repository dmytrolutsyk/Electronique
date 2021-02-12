import { AsyncContainerModule, interfaces } from 'inversify';
import * as mongoose from 'mongoose';

import { SHARED_TYPES } from '../../ioc/types';
import { Connection } from '../../definitions';
import { IWeatherDAO } from '../../definitions/dao';
import { WeatherMongooseDAO } from './dao';

export const mongooseModule = new AsyncContainerModule(async (bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound) => {
    if(!isBound(mongoose.Mongoose)) {
        const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        });
        bind<Connection>(SHARED_TYPES.Connection).toConstantValue(connection.connection as Connection);
        bind<mongoose.Mongoose>(mongoose.Mongoose).toConstantValue(connection);
    }

    bind<IWeatherDAO>(SHARED_TYPES.DAO.Weather).to(WeatherMongooseDAO).inSingletonScope();

});