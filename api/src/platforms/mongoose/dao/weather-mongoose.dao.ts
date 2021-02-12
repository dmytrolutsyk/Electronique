import { Model, Mongoose, Types } from 'mongoose';
import { inject, injectable } from 'inversify';

import { BaseMongooseDAO} from './base-mongoose.dao';
import { WeatherModel, IWeatherDocument } from '../models';
import { IWeatherDAO } from '../../../definitions/dao';
import { IWeather } from '../../../definitions/models';

@injectable()
export class WeatherMongooseDAO extends BaseMongooseDAO<IWeatherDocument> implements IWeatherDAO {

    public constructor(@inject(Mongoose) mongoose: Mongoose) {
        super(mongoose);
    }

    getModel(): Model<IWeatherDocument> {
        return WeatherModel;
    }

   async save(weather: IWeather): Promise<IWeatherDocument> {
        try {
            const obj = await this.getModel().create(weather);
            if(!obj) throw new Error('COULD NOT CREATE OBJECT');

            return obj;
        }
        catch(err) {
            console.log(`- ${new Date() } ${err.message}`);
            return err;
        }
    }

    async getLast(): Promise<IWeatherDocument> {
        try {
            const obj = await this.getModel()
                            .find()
                            .sort({ createdAt: -1 })
                            .limit(1)
                            .exec();

            if(!obj) throw new Error('CONNEXION ERROR');
            return obj[0];
        }
        catch(err) {
            console.log(`- ${new Date() } ${err.message}`);
            return err;
        }
    }
}