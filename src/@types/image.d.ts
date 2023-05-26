import GalleryImage from "../Models/GalleryImage";

export type ActionsContextType = {
    isLightboxOpen: Boolean;
    focusedImage: GalleryImage | null;
    openLightbox: (imageToFocus: GalleryImage) => void
    closeLightbox: () => void
}

export type SimilarityCriteria = {
    id: int;
    internalName: string;
    title: string;
    description: string;
    active: boolean;
    explainerImgPath: string
}

export type ImageContextType = {
    similarityCriterias: SimilarityCriteria[];
    images: GalleryImage[];
    AMOUNT_RANGE: number[];
    SIZING_RULES: Array<GallerySizingRule>;
    currentSizingRuleIdx: number;
    setCurrentSizingRuleIdx: React.Dispatch<React.SetStateAction<number>>;
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

export type GallerySizingRule = {
    base: string;
    increase: string;
    baseMainImg: string;
    increaseMainImg: string;
    maxImageCount: number;
}
