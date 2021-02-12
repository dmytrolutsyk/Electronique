import { Id } from './id.interface';

export interface IWeather {
    id?: Id;
    temperature: Number,
    humidity: Number,
}