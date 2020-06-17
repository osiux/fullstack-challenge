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
        const placeItem = await getBusinessById(place.placeId);

        return {
            id: placeItem.id,
            name: placeItem.name,
            image_url: placeItem.image_url,
            yelp_url: placeItem.url,
            phone: placeItem.display_phone,
            address: placeItem.location
                ? placeItem.location.display_address.join(', ')
                : '',
            rating: placeItem.rating,
        };
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
