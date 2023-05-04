export type SimilarityCriteria = {
    id: int;
    internalName: string;
    title: string;
    description: string;
    active: boolean;
}

export type ImageContextType = {
    similarityCriterias: SimilarityCriteria[];
    images: GalleryImage[];
    findSimilarImages: (id: number) => void;
    toggleCriteria: (id: number) => void;
}

export interface IGalleryImage {
    id: number;
    title: string;
    year: number;
    url: string;
    artist: string;
    category: string;
    isMain: boolean;
}
