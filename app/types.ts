export interface Spider {
    name: string;
    genus: string;
    species: string;
    img: string;
}

export interface Species {
    genus: string;
    name: string;
}

// grouped species as we expose them to the view
export interface Genus {
    name: string;
    species: string[];
}
