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
    public id: string;

    @Column('uuid')
    public user: string;

    @Column({ nullable: true, type: 'varchar' })
    public name: string;

    @Column({ type: 'timestamp' })
    @CreateDateColumn()
    public createdAt: Date;

    @OneToMany(() => Place, (place) => place.tour)
    public places: Place[];
}
