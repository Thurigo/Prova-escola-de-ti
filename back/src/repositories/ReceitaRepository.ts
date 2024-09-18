import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Receita } from "../entities/Receita";

class ReceitaRepository {
    private repository: Repository<Receita>;

    constructor() {
        this.repository = AppDataSource.getRepository(Receita);
    }

    async create(data: Partial<Receita>): Promise<Receita> {
        const receita = this.repository.create(data);
        return await this.repository.save(receita);
    }

    async findAll(): Promise<Receita[]> {
        return await this.repository.find({ relations: ["ingredientes"] });
    }

    async findById(id: number): Promise<Receita | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["ingredientes"],
        });
    }

    async update(id: number, data: Partial<Receita>): Promise<Receita | null> {
        await this.repository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new ReceitaRepository();
