import GalleryImage from "./GalleryImage";
import axios from "axios";

export default class ImageLoader{
    
    loadImagesFromLocalAPI(id: number, setter: (images: any) => void) {
        axios.get(`http://localhost:8000/similars/${id.toString()}`)
            .then((data) => {
                setter(this.mapJsonToObjects(data))
            })
    }

    mapJsonToObjects(jsonData: any): GalleryImage[]{ 
        return jsonData.data.message.map((element: any) => {
            return new GalleryImage(element.idimage, element.title, element.year, element.URL, " ", element.name, element.isMain)
        })
    }
}