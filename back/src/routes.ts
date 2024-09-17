import { Router } from "express";
import receitaController from "./controllers/receita.controller";
import ingredienteController from "./controllers/ingrediente.controller";
import convertIdToNumber from "./middlewares/convertIdToNumber";

const routes = Router();
routes.post("/receitas", receitaController.createReceita);  // Acesse a função corretamente
routes.get("/receitas", receitaController.getAllReceitas);
routes.get("/receitas/:id", convertIdToNumber, receitaController.getReceitaById);
routes.put("/receitas/:id", convertIdToNumber, receitaController.updateReceita);
routes.delete("/receitas/:id", convertIdToNumber, receitaController.deleteReceita);

routes.post("/ingredientes", ingredienteController.createIngrediente);
routes.get("/ingredientes", ingredienteController.getAllIngredientes);
routes.get("/ingredientes/:id", convertIdToNumber, ingredienteController.getIngredienteById);
routes.put("/ingredientes/:id", convertIdToNumber, ingredienteController.updateIngrediente);
routes.delete("/ingredientes/:id", convertIdToNumber, ingredienteController.deleteIngrediente);


export default routes;
