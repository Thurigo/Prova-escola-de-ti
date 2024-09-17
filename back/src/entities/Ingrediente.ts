import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Receita } from "./Receita";

@Entity()
export class Ingrediente {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Receita, receita => receita.ingredientes)
    receitas: Receita[];

}
