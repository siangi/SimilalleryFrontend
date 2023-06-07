import React, { useContext, useEffect } from "react";
import { useState } from "react";

import { IGalleryImage, ImageContextType, SettingsContextType } from "../@types/image";
import ImageLoader from "../Models/ImageLoader";
import { SettingsContext } from "./SettingsContext";


type Props = {
    children: any
}

export const ImageContext = React.createContext<ImageContextType | null>(null);

const ImageProvider = ({ children }: Props) => {
    const settingsContext = useContext(SettingsContext) as SettingsContextType;
    const [images, setimages] = useState<IGalleryImage[]>([]);

    useEffect(() => {
        if (images.length > 0) {
            findSimilarImages(images[0].id)
        }
    }, [settingsContext.similarityCriterias, settingsContext.imgAmount])


    const findSimilarImages = (id: number) => {
        setimages([])
        const loader = new ImageLoader();
        const activeCriteriaIDs: number[] = settingsContext.getActiveSimilarityIds()
        loader.loadImagesFromLocalAPI(id, activeCriteriaIDs, settingsContext.imgAmount, setimages);
        settingsContext.calcSizingRuleIdx()
    }


    const findSimilarsRandom = () => {
        findSimilarImages(-1)
    }

    return <ImageContext.Provider value={{ images, findSimilarImages, findSimilarsRandom }}>
        {children}
    </ImageContext.Provider>
}

export default ImageProvider