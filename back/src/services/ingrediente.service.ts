import { ingredienteDTO } from "../dto/ingrediente-dto";
import IngredienteRepository from "../repositories/IngredienteRepository";



const createIngrediente = async (data: ingredienteDTO) => {
    return await IngredienteRepository.create(data);
};

const getAllIngredientes = async () => {
    return await IngredienteRepository.findAll();
};

const getIngredienteById = async (id: number) => {
    return await IngredienteRepository.findById(id);
};

const updateIngrediente = async (id: number, data: Partial<ingredienteDTO>) => {
    return await IngredienteRepository.update(id, data);
};

const deleteIngrediente = async (id: number) => {
    await IngredienteRepository.delete(id);
    return { message: "Ingrediente deleted successfully" };
};

export default {
    createIngrediente,
    getAllIngredientes,
    getIngredienteById,
    updateIngrediente,
    deleteIngrediente,
};
