import GalleryImage from "../Models/GalleryImage";

export type ImageContextType = {
    images: GalleryImage[];
    findSimilarImages: (id: number) => void
}

export type ActionsContextType = {
    isLightboxOpen: Boolean;
    focusedImage: GalleryImage | null;
    openLightbox: (imageToFocus: GalleryImage) => void
    closeLightbox: () => void
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
