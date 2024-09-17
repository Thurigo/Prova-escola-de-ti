import { ReceitaDTO } from "../dto/receitas-dto";
import ReceitaRepository from "../repositories/ReceitaRepository";

const createReceita = async (data: ReceitaDTO) => {
    try {
        return await ReceitaRepository.create(data);
    } catch (error) {
        console.error("Erro ao criar receita no serviço:", error);
        throw new Error("Erro ao criar receita");
    }
};

const getAllReceitas = async () => {
    try {
        return await ReceitaRepository.findAll();
    } catch (error) {
        console.error("Erro ao buscar receitas no serviço:", error);
        throw new Error("Erro ao buscar receitas");
    }
};

const getReceitaById = async (id: number) => {
    try {
        return await ReceitaRepository.findById(id);
    } catch (error) {
        console.error("Erro ao buscar receita no serviço:", error);
        throw new Error("Erro ao buscar receita");
    }
};

const updateReceita = async (id: number, data: Partial<ReceitaDTO>) => {
    try {
        return await ReceitaRepository.update(id, data);
    } catch (error) {
        console.error("Erro ao atualizar receita no serviço:", error);
        throw new Error("Erro ao atualizar receita");
    }
};

const deleteReceita = async (id: number) => {
    try {
        await ReceitaRepository.delete(id);
        return { message: "Receita deletada com sucesso" };
    } catch (error) {
        console.error("Erro ao deletar receita no serviço:", error);
        throw new Error("Erro ao deletar receita");
    }
};

export default {
    createReceita,
    getAllReceitas,
    getReceitaById,
    updateReceita,
    deleteReceita,
};
