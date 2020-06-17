import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tour } from './Tour';

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar' })
    public placeId: string;

    @ManyToOne(() => Tour, (tour) => tour.id)
    public tour: Tour;
}
