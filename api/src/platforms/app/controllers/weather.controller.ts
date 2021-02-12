import { Request, Response, Router} from 'express';
import { inject, injectable } from "inversify";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import ioserver, { Socket } from 'socket.io';
import ioclient from 'socket.io-client';

import { SHARED_TYPES } from "../../../ioc/types";
import { IWeatherDAO } from "../../../definitions/dao";
import { WeatherDTO } from '../../../definitions/dto';
import { Body, IWeather } from '../../../definitions';

@injectable()
export class WeatherController {
  readonly weatherDAO: IWeatherDAO;

  constructor(@inject(SHARED_TYPES.DAO.Weather) weatherDAO: IWeatherDAO) {
    this.weatherDAO = weatherDAO;
  }

  async getAll(req: Request, res: Response) {
    try {
      let weathers: IWeather[] = await this.weatherDAO.getAll();
      if(weathers instanceof Error) throw weathers;
      res.send(new Body(weathers));
    }
    catch(err) {
      console.log(`- ${new Date() } ${err.message}`);
      res.send(new Body(err.message, true));
    }
  }

  async getLast(req: Request, res: Response){
    const socketclient = ioclient('http://localhost:' + 3000);
    socketclient.on('connect', async () => {
      try {
        const weather = await this.weatherDAO.getLast();
        if(weather instanceof Error) throw weather;
        res.send(new Body(weather));
      } 
      catch(err) {
        console.log(`- ${new Date() } ${err.message}`);
        res.send(new Body(err.message, true));
      }

      res.json({ data: 'just hi' });
    });


    // try {
    //     const weather = await this.weatherDAO.getLast();
    //     if(weather instanceof Error) throw weather;
    //     res.send(new Body(weather));
    // } 
    // catch(err) {
    //   console.log(`- ${new Date() } ${err.message}`);
    //   res.send(new Body(err.message, true));
    // }
  }

  async create(req: Request, res: Response) {
    const body = req.body;

    try {
      const weatherDTO = plainToClass(WeatherDTO, body);
      const errors = await validate(weatherDTO);
      if (errors.length > 0) throw new Error('BAD REQUEST');

      const weather = await this.weatherDAO.save(weatherDTO);
      if(weather instanceof Error) throw weather;

      res.send(new Body(weather));
    } 
    catch(err) {
      console.log(`- ${new Date() } ${err.message}`);
      res.send(new Body(err.message, true));
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const deleted = await this.weatherDAO.removeById(id);
      if(deleted instanceof Error) throw deleted;
      
      res.send(new Body(deleted));
    } 
    catch(err) {
      console.log(`- ${new Date() } ${err.message}`);
      res.send(new Body(err.message, true));
    }
  }

  build(): Router {
    const router = Router();

    router.get("/weather/", this.getAll.bind(this));
    router.post("/weather/", this.create.bind(this));
    router.get("/weather/last", this.getLast.bind(this));

    router.delete("/weather/:id", this.delete.bind(this));

    return router;
  }
}
