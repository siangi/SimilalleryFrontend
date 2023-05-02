import React from "react";
import { useState } from "react";
import { IGalleryImage, ImageContextType } from "../@types/image";
import ImageLoader from "../Models/ImageLoader";


type Props = {
    children: any
}

export const ImageContext = React.createContext<ImageContextType | null>(null);


const ImageProvider = ({ children }: Props) => {
    const [images, setimages] = useState<IGalleryImage[]>([]);
    const findSimilarImages = (id: number) => {
        console.log("find images with id:", id);
        const loader = new ImageLoader();
        loader.loadImagesFromLocalAPI(id, setimages);
    }

    return <ImageContext.Provider value={{images, findSimilarImages}}>
            {children}
        </ImageContext.Provider>
}

export default ImageProvider