import ky from 'ky-universal';
import { promisify } from 'util';
import { createClient } from 'redis';

import { Business } from '../types';

const getBusinessById = async (businessId: string) => {
    const redisClient = createClient({
        url: process.env.REDIS_URL,
    });

    const getAsync = promisify(redisClient.get).bind(redisClient);

    const businessFromCache = await getAsync(`business:${businessId}`);

    let business: Partial<Business> = {};

    if (!businessFromCache) {
        const response: Business = await ky
            .get(`https://api.yelp.com/v3/businesses/${businessId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
                },
            })
            .json();

        redisClient.set(`business:${businessId}`, JSON.stringify(response));

        business = response;
    } else {
        business = JSON.parse(businessFromCache);
    }

    return business;
};

export default getBusinessById;
