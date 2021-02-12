import 'reflect-metadata' // FORCE TO LOAD annotations
import * as dotenv from 'dotenv';
dotenv.config(); // par default: .env

import { Container } from "inversify";
import * as http from "http";

import { SHARED_TYPES } from './ioc/types';
import { appModule } from './platforms/app';
import { mongooseModule } from './platforms/mongoose';

async function main() {
    const container = new Container();
    container.load(appModule);
    await container.loadAsync(mongooseModule);
    container.get<http.Server>(SHARED_TYPES.Server);
}

main().catch(console.error);
