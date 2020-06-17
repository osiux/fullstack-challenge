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

    @Column({ nullable: true })
    public name: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @OneToMany(() => Place, (place) => place.tour, { cascade: true })
    public places: Place[];
}
