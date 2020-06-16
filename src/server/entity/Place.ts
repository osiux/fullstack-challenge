import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import {Tour} from './Tour';

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    placeId!: string;

    @ManyToOne(type => Tour, tour => tour.id)
    tour!: Tour
}
