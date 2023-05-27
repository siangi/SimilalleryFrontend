import { IGalleryImage } from "../@types/image";

// image.idimage, image.title, image.year, image.URL, artist.name, category.name
export default class GalleryImage implements IGalleryImage {
    id: number;
    title: string;
    year: number;
    url: string;
    artist: string;
    category: string;
    isMain: boolean;
    loaded: boolean;

    constructor(id: number, title: string, year: number, url: string, artist: string, category: string, isMain: boolean = false) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.url = url;
        this.artist = artist;
        this.category = category;
        this.isMain = isMain;
        this.loaded = false;
    }
}