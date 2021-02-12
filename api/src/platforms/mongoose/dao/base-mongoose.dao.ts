import { Document, Model, Mongoose, Types } from "mongoose";
import { inject, injectable } from "inversify";

import { IBaseDAO } from "../../../definitions/dao";
import { Id } from "../../../definitions/models";

@injectable()
export abstract class BaseMongooseDAO<Type extends Document> implements IBaseDAO<Type> {

    readonly mongoose: Mongoose;

    protected constructor(@inject(Mongoose) mongoose: Mongoose) {
        this.mongoose = mongoose;
    }

    abstract getModel(): Model<Type>;

    async getAll(): Promise<Type[]> {
        try {
            const objects = await this.getModel().find().exec();
            if(!objects) throw new Error('CONNECTION ERROR');
            return objects;
        }
        catch(err) {
            console.log(`- ${new Date() } ${err.message}`);
            return err;
        }
    }

    async getById(id: Id): Promise<Type> {
        try {
            if(!Types.ObjectId.isValid(id.toString())) throw new Error('BAD REQUEST');
            
            const object = await this.getModel().findById(id).exec();
            if(!object) throw new Error('COULD NOT FIND OBJECT');

            return object;
        } 
        catch(err) {
            console.log(`- ${new Date() } ${err.message}`);
            return err;
        }
    }

    async removeById(id: Id): Promise<String> {
        try {
            if(!Types.ObjectId.isValid(id.toString())) throw new Error('BAD REQUEST')
            const obj = await this.getModel().findByIdAndDelete(id);
            if(!obj) throw new Error('COULD NOT DELETE OBJECT');

            return 'DELETED';
        }
        catch(err) {
            console.log(`- ${new Date() } ${err.message}`);
            return err;
        }
    }

}