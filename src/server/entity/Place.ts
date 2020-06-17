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
    public id: number;

    @Column()
    public placeId: string;

    @ManyToOne(() => Tour, tour => tour.id)
    public tour: Tour
}
