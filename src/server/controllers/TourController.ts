import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ObjectsToCsv from 'objects-to-csv';

import { Business } from '../types';

import { Tour } from '../entity/Tour';
import { Place } from '../entity/Place';

import getBusinessById from '../helpers/getBusinessById';
import getTourById from '../helpers/getTourById';
import generatePdf from '../helpers/generatePdf';

const allowedFormats = ['pdf', 'json', 'csv'];

export class TourController {
    static saveTour = async (req: Request, res: Response) => {
        const placeRepository = getRepository(Place);
        const tourRepository = getRepository(Tour);

        const { user, name, places } = req.body;

        const tourItem = tourRepository.create({
            name,
            user,
        });
        await tourRepository.save(tourItem);

        const placesPromises: Partial<Business>[] = places.map(
            async (placeId: string) => {
                const placeItem = placeRepository.create({
                    placeId,
                    tour: tourItem,
                });

                return await placeRepository.save(placeItem);
            }
        );

        await Promise.all(placesPromises);

        res.send({
            tourId: tourItem.id
        });
    };

    static fetchTour = async (req: Request, res: Response) => {
        const { tourId } = req.params;

        try {
            const tour = await getTourById(tourId);

            res.send(tour);
        } catch (e) {
            res.status(404).send({
                error: e.message,
            });
        }
    };

    static fetchTours = async (req: Request, res: Response) => {
        const { userId } = req.params;

        const tourRepository = getRepository(Tour);

        const tours = await tourRepository
            .createQueryBuilder('tours')
            .leftJoinAndSelect('tours.places', 'place')
            .where('tours.user = :user', { user: userId })
            .getMany();

        res.send(tours);
    };

    static download = async (req: Request, res: Response) => {
        const { tourId } = req.params;
        const { format = 'json' } = req.query;

        try {
            if (!allowedFormats.includes(format as string)) {
                throw new Error('Format not allowed.');
            }

            const tour = await getTourById(tourId);

            switch (format) {
                case 'json':
                default:
                    res.attachment(`tour-${tour.id}.json`);
                    res.send(tour);
                    break;
                case 'csv':
                    {
                        const tourArray = tour.places.map((place) => {
                            return {
                                tourId: tour.id,
                                tourName: tour.name,
                                tourCreatorId: tour.user,
                                tourCreatedAt: tour.createdAt,
                                ...place,
                            };
                        });
                        const csv = new ObjectsToCsv(tourArray);

                        const csvText = await csv.toString();

                        res.attachment(`tour-${tour.id}.csv`);
                        res.send(csvText);
                    }
                    break;
                case 'pdf':
                    {
                        const pdf = await generatePdf(tour);

                        res.attachment(`tour-${tour.id}.pdf`);
                        pdf.pipe(res);
                        pdf.end();
                    }
                    break;
            }
        } catch (e) {
            res.status(404).send({
                error: e.message,
            });
        }
    };
}
