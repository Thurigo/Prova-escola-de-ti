import { Request, Response } from "express";
import ReceitaService from "../services/receita.service";

const createReceita = async (req: Request, res: Response) => {
    try {
        const receita = await ReceitaService.createReceita(req.body);
        return res.status(201).json(receita);
    } catch (error) {
        console.error("Erro ao criar receita:", error);
        return res.status(500).json({ message: "Erro ao criar receita" });
    }
};

const getAllReceitas = async (req: Request, res: Response) => {
    try {
        const receitas = await ReceitaService.getAllReceitas();
        return res.json(receitas);
    } catch (error) {
        console.error("Erro ao buscar receitas:", error);
        return res.status(500).json({ message: "Erro ao buscar receitas" });
    }
};

const getReceitaById = async (req: Request, res: Response) => {
    try {
        const receita = await ReceitaService.getReceitaById((req as any).idNumber);
        return res.json(receita);
    } catch (error) {
        console.error("Erro ao buscar receita:", error);
        return res.status(500).json({ message: "Erro ao buscar receita" });
    }
};

const updateReceita = async (req: Request, res: Response) => {
    try {
        const updatedReceita = await ReceitaService.updateReceita((req as any).idNumber, req.body);
        return res.json(updatedReceita);
    } catch (error) {
        console.error("Erro ao atualizar receita:", error);
        return res.status(500).json({ message: "Erro ao atualizar receita" });
    }
};

const deleteReceita = async (req: Request, res: Response) => {
    try {
        const result = await ReceitaService.deleteReceita((req as any).idNumber);
        return res.json(result);
    } catch (error) {
        console.error("Erro ao deletar receita:", error);
        return res.status(500).json({ message: "Erro ao deletar receita" });
    }
};

export default {
    createReceita,
    getAllReceitas,
    getReceitaById,
    updateReceita,
    deleteReceita,
};
