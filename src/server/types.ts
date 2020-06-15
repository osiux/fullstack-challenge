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
