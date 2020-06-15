import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tour {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('uuid')
    user!: string;

    @Column()
    name!: string;
}
