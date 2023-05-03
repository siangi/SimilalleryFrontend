import GalleryImage from "./GalleryImage";
import axios from "axios";

export default class ImageLoader {

    loadImagesFromLocalAPI(id: number, setter: (images: any) => void) {
        axios.get(`http://localhost:8000/similars/?baseId=${id}&imageCount=7&${[1, 5].map((n) => `similarityCriteria=${n}`).join("&")}`, {

        }).then((data) => {
            setter(this.mapJsonToObjects(data))
        })

        // axios.post("http://localhost:8000/similars/", {
        //     baseId: id,
        //     similarityCriteria: [1, 5]
        // })
        // .then((data) => {
        //     console.log(data.data.message.length)
        //     setter(this.mapJsonToObjects(data))
        // })
    }

    mapJsonToObjects(jsonData: any): GalleryImage[] {
        return jsonData.data.message.map((element: any) => {
            return new GalleryImage(element.idimage, element.title, element.year, element.URL, " ", element.name, element.isMain)
        })
    }
}