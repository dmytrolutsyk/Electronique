import { IWeather } from '../models';
import { IBaseDAO } from './base.dao.interface'

export interface IWeatherDAO extends IBaseDAO<IWeather> {
    save(weather: IWeather): Promise<IWeather>;
    getLast(): Promise<IWeather>;
}