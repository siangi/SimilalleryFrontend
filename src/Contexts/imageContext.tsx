import React from "react";
import { useState } from "react";
import { IGalleryImage, ImageContextType, SimilarityCriteria } from "../@types/image";
import ImageLoader from "../Models/ImageLoader";


type Props = {
    children: any
}

export const ImageContext = React.createContext<ImageContextType | null>(null);


const ImageProvider = ({ children }: Props) => {
    // get this from the API?
    const [similarityCriterias, setSimilarityCriterias] = useState<SimilarityCriteria[]>([
        { id: 0, title: "Color Palette", description: "", internalName: "palette", active: true },
        { id: 1, title: "Palette Ratios", description: "", internalName: "paletteratios", active: false },
        { id: 2, title: "Edge Orientation", description: "", internalName: "edgeorient", active: false },
        { id: 3, title: "Saliency Centrepoint", description: "", internalName: "saliencycenter", active: false },
        { id: 4, title: "Saliency Bounding Rectangle", description: "", internalName: "saliencyrect", active: true }
    ])
    const AMOUNT_RANGE = [4, 30]
    const [imgAmount, setImgAmount] = useState<number>(16)
    const [images, setimages] = useState<IGalleryImage[]>([]);

    const toggleCriteria = (id: number) => {
        setSimilarityCriterias(similarityCriterias.map((criteria) => {
            if (criteria.id === id) {
                criteria.active = !criteria.active;
            }

            return criteria
        }))
    }

    const findSimilarImages = (id: number) => {
        const loader = new ImageLoader();
        const activeCriteriaIDs: number[] = []
        similarityCriterias.forEach(element => {
            if (element.active) {
                activeCriteriaIDs.push(element.id)
            }
        });
        loader.loadImagesFromLocalAPI(id, activeCriteriaIDs, imgAmount, setimages);
    }

    const findSimilarsRandom = () => {
        // make API function for this.
        findSimilarImages(Math.ceil(Math.random() * 55000))
    }

    return <ImageContext.Provider value={{ images, similarityCriterias, AMOUNT_RANGE, imgAmount, setImgAmount, findSimilarImages, findSimilarsRandom, toggleCriteria }}>
        {children}
    </ImageContext.Provider>
}

export default ImageProvider