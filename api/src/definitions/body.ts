import { IBody } from "./models/body.interface";

export class Body implements IBody {
    error: boolean;
    message: any;

    constructor(message: any, error: boolean = false){
        this.message = message;
        this.error = error;
    }
}