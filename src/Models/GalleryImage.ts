// image.idimage, image.title, image.year, image.URL, artist.name, category.name
export default class GalleryImage {
    id: number;
    title: string;
    year: number;
    url: string;
    artist: string;
    category: string;
    
    constructor (id: number, title: string, year: number, url: string, artist: string, category: string){
        this.id = id;
        this.title = title;
        this.year = year;
        this.url = url;
        this.artist = artist;
        this.category = category;
    }
}