import { IWeather } from '../../../definitions/models';
import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export type IWeatherDocument = IWeather & Document;

export const WeatherSchema = new Schema({
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

export const WeatherModel = mongoose.model<IWeatherDocument>('Weather', WeatherSchema);