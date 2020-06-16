import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';

import { Place } from './Place';

@Entity('tours')
export class Tour {
    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column('uuid')
    user!: string;

    @Column()
    name!: string;

    @Column()
    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(type => Place, place => place.tour)
    places!: Place[];
}
