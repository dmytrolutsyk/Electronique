import { IsNumber } from 'class-validator';

import { IWeather } from '../models';

export class WeatherDTO implements IWeather {

    @IsNumber()
    readonly temperature!: number;

    @IsNumber()
    readonly humidity!: number;
    
}