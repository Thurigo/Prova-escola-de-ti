import { Request, Response } from "express";
import IngredienteService from "../services/ingrediente.service";

const createIngrediente = async (req: Request, res: Response) => {
    try {
        const ingrediente = await IngredienteService.createIngrediente(req.body);
        return res.json(ingrediente);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllIngredientes = async (req: Request, res: Response) => {
    try {
        const ingredientes = await IngredienteService.getAllIngredientes();
        return res.json(ingredientes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getIngredienteById = async (req: Request, res: Response) => {
    try {
        const ingrediente = await IngredienteService.getIngredienteById(Number(req.params.id));
        return res.json(ingrediente);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateIngrediente = async (req: Request, res: Response) => {
    try {
        const updatedIngrediente = await IngredienteService.updateIngrediente(Number(req.params.id), req.body);
        return res.json(updatedIngrediente);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteIngrediente = async (req: Request, res: Response) => {
    try {
        await IngredienteService.deleteIngrediente(Number(req.params.id));
        return res.json({ message: "Ingrediente deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    createIngrediente,
    getAllIngredientes,
    getIngredienteById,
    updateIngrediente,
    deleteIngrediente,
};
