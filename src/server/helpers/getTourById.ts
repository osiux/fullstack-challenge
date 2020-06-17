import { getRepository } from 'typeorm';

import { Tour } from '../entity/Tour';

import { Tour as TourType } from '../types';

import getBusinessById from './getBusinessById';

const getTourById = async (tourId: string): Promise<TourType> => {
    const tourRepository = getRepository(Tour);

    const tour = await tourRepository.findOneOrFail(tourId, {
        relations: ['places'],
    });

    const placesPromises = tour.places.map(async (place) => {
        return await getBusinessById(place.placeId);
    });

    const places = await Promise.all(placesPromises);

    return {
        id: tour.id,
        name: tour.name,
        user: tour.user,
        createdAt: tour.createdAt,
        places,
    };
};

export default getTourById;
