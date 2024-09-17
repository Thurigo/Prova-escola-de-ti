import "reflect-metadata"
import { DataSource } from "typeorm"
import { Receita } from "./entities/Receita"
import { Ingrediente } from "./entities/Ingrediente"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Receita, Ingrediente],
    migrations: [],
    subscribers: [],
})
