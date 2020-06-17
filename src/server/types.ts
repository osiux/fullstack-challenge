export type Category = {
    title: string;
};

export type Coordinates = {
    latitude: number;
    longitude: number;
};

export type Location = {
    display_address: string[];
};

export type Business = {
    id: string;
    name: string;
    image_url: string;
    review_count: number;
    categories: Category[];
    rating: number;
    coordinates: Coordinates;
    location: Location;
    display_phone: string;
    distance: number;
    price: string;
    url?: string;
    yelp_url?: string;
};

export type Place = Business & {
    address: string;
    phone: string;
    rating: string;
};

export type Tour = {
    id: string;
    name?: string | null;
    user?: string;
    createdAt?: Date;
    places: Place[];
};

export type PostTour = {
    user: string;
    name: string;
    places: string[];
};

export type ParamsDictionary = {
    [key: string]: string;
};

export type SearchParams = {
    term: string;
    location: string;
    radius: number;
};

export type SearchResponse = {
    businesses: Business[];
};
