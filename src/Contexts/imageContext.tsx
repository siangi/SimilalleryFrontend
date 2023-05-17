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
        { id: 0, title: "Color Palette", description: "", internalName: "palette", active: true, explainerImgPath: "/images/Explainers/Palette.png" },
        { id: 1, title: "Color Area Size", description: "", internalName: "paletteratios", active: false, explainerImgPath: "/images/Explainers/PalRatio.png" },
        { id: 2, title: "Edge Orientation", description: "", internalName: "edgeorient", active: false, explainerImgPath: "/images/Explainers/EdgeOrientation.png" },
        { id: 4, title: "Subject Position", description: "", internalName: "saliencyrect", active: true, explainerImgPath: "/images/Explainers/SubjectPosition.png" }
    ])
    const AMOUNT_RANGE = [4, 30]
    const [imgAmount, setImgAmount] = useState<number>(16)
    const [images, setimages] = useState<IGalleryImage[]>([]);

    const toggleCriteria = (id: number) => {
        setSimilarityCriterias(similarityCriterias.map((criteria) => {
            if (criteria.id === id) {
                // one criteria always has to be selected
                if (!(criteria.active && similarityCriterias.filter((val) => val.active).length <= 1)) {
                    criteria.active = !criteria.active;
                }

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
        findSimilarImages(-1)
    }

    return <ImageContext.Provider value={{ images, similarityCriterias, AMOUNT_RANGE, imgAmount, setImgAmount, findSimilarImages, findSimilarsRandom, toggleCriteria }}>
        {children}
    </ImageContext.Provider>
}

export default ImageProvider