import "reflect-metadata";
import * as express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import * as cors from "cors";  

AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(routes);
    app.listen(3001, () => console.log("Server running on port 3001"));
}).catch((error) => console.log("Error during Data Source initialization", error));
