import ky from 'ky-universal';
import { Request, Response } from 'express';

import { ParamsDictionary, SearchParams, SearchResponse } from '../types';

import getBusinessById from '../helpers/getBusinessById';

const MAX_SEARCH_RADIUS = 40000;

export class SearchController {
    static search = async (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        req: Request<ParamsDictionary, any, any, SearchParams>,
        res: Response
    ) => {
        const { term, location, radius } = req.query;

        if (!term || !location) {
            res.status(422).send({
                error: 'Term or location not specified.',
            });
        }

        const params = new URLSearchParams();
        params.set('term', term);
        params.set('location', location);
        params.set('limit', '21');

        if (radius && radius > 0) {
            let radiusInMeters = Math.ceil(radius * 1609.344);
            console.log(
                `Converted ${radius} miles to meters. Result: ${radiusInMeters}`
            );
            if (radiusInMeters > MAX_SEARCH_RADIUS) {
                console.log(
                    `Max radius is ${MAX_SEARCH_RADIUS}. Tried ${radiusInMeters}`
                );
                radiusInMeters = MAX_SEARCH_RADIUS;
            }
            params.set('radius', radiusInMeters.toString());
        }

        try {
            const response: SearchResponse = await ky
                .get(`https://api.yelp.com/v3/businesses/search`, {
                    searchParams: params,
                    headers: {
                        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
                    },
                })
                .json();

            res.send(response.businesses);
        } catch (e) {
            res.status(404).send({
                error: e.message,
            });
        }
    };

    static business = async (req: Request, res: Response) => {
        const { businessId } = req.params;

        if (!businessId) {
            res.status(404).send({
                error: 'Business not found.',
            });
        }

        try {
            const business = await getBusinessById(businessId);

            res.send(business);
        } catch (e) {
            res.status(404).send({
                error: e.message,
            });
        }
    };
}
