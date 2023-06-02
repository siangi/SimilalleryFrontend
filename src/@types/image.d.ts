import { JsxElement } from "typescript";
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
    icon: ReactElement;
}

export type ImageContextType = {
    images: GalleryImage[];
    findSimilarImages: (id: number) => void;
    findSimilarsRandom: () => void;
}

export type SettingsContextType = {
    similarityCriterias: SimilarityCriteria[];
    AMOUNT_RANGE: number[];
    imgAmount: number;
    setImgAmount: React.Dispatch<React.SetStateAction<number>>;
    SIZING_RULES: Array<GallerySizingRule>;
    currentSizingRuleIdx: number;
    calcSizingRuleIdx: () => void;
    setCurrentSizingRuleIdx: React.Dispatch<React.SetStateAction<number>>;
    getActiveSimilarityIds: () => number[];
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
    loaded: boolean;
}

export type GallerySizingRule = {
    base: string;
    increase: string;
    baseMainImg: string;
    increaseMainImg: string;
    maxImageCount: number;
}
