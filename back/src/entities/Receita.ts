import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Ingrediente } from "./Ingrediente"

@Entity()
export class Receita {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    time: number 

    @Column()
    cost: number 

    @ManyToMany(() => Ingrediente, ingrediente => ingrediente.receitas)
    @JoinTable() 
    ingredientes: Ingrediente[];
}
