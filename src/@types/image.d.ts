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
    AMOUNT_RANGE: number[];
    imgAmount: number;
    setImgAmount: React.Dispatch<React.SetStateAction<number>>;
    findSimilarImages: (id: number) => void;
    findSimilarsRandom: () => void
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
