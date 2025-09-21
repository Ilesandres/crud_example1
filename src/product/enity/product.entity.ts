import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:'varchar', length:100, nullable:false})
    name:string;
    @Column({type:'boolean', nullable:false})
    price:number;
}