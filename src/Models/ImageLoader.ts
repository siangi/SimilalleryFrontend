import { element } from "prop-types";
import GalleryImage from "./GalleryImage";
import axios from "axios";

export default class ImageLoader {

    loadImagesFromLocalAPI(id: number, similarityCriteria: number[], imgAmount: number, setter: (images: any) => void) {
        axios.get(`http://localhost:8000/similars/?baseId=${id}&imageCount=${imgAmount}&${similarityCriteria.map((n) => `similarityCriteria=${n}`).join("&")}`, {

        }).then((data) => {
            setter(this.mapJsonToObjects(data))
        })
    }

    mapJsonToObjects(jsonData: any): GalleryImage[] {
        return jsonData.data.message.map((element: any) => {
            return new GalleryImage(element.idimage, element.title, element.year, element.URL, element.artist_name, element.category_name, element.isMain)
        })

    }

    mainToMiddle(images: GalleryImage[]) {
        let middle = Math.ceil(images.length / 2)
        let main = images[0]
        images.splice(0, 1);
        images.splice(middle, 0, main)

        return images
    }
}