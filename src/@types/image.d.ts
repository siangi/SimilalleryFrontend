export type ImageContextType = {
    images: GalleryImage[];
    findSimilarImages: (id: number) => void
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
