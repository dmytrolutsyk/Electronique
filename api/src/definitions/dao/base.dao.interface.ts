import { Id } from "../models";

export interface IBaseDAO<Type> {
    getAll(): Promise<Type[]>;
    getById(id: Id): Promise<Type>;
    removeById(id: Id): Promise<String>;
}