import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Ingrediente } from "../entities/Ingrediente";

class IngredienteRepository {
    private repository: Repository<Ingrediente>;

    constructor() {
        this.repository = AppDataSource.getRepository(Ingrediente);
    }

    async create(data: Partial<Ingrediente>): Promise<Ingrediente> {
        const ingrediente = this.repository.create(data);
        return await this.repository.save(ingrediente);
    }

    async findAll(): Promise<Ingrediente[]> {
        return await this.repository.find({ relations: ["receitas"] });
    }

    async findById(id: number): Promise<Ingrediente | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["receitas"],
        });
    }

    async update(id: number, data: Partial<Ingrediente>): Promise<Ingrediente | null> {
        await this.repository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new IngredienteRepository();
