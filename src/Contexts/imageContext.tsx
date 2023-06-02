import React, { useContext, useEffect } from "react";
import { useState } from "react";

import { IGalleryImage, ImageContextType, SettingsContextType, SimilarityCriteria } from "../@types/image";
import ImageLoader from "../Models/ImageLoader";
import { SettingsContext } from "./SettingsContext";


type Props = {
    children: any
}

export const ImageContext = React.createContext<ImageContextType | null>(null);

const ImageProvider = ({ children }: Props) => {
    const settingsContext = useContext(SettingsContext) as SettingsContextType;
    const [images, setimages] = useState<IGalleryImage[]>([]);
    const [imagesHidden, setImagesHidden] = useState(true)

    useEffect(() => {
        if (images.length > 0) {
            findSimilarImages(images[0].id)
        }
    }, [settingsContext.similarityCriterias, settingsContext.imgAmount])


    const findSimilarImages = (id: number) => {
        const loader = new ImageLoader();
        const activeCriteriaIDs: number[] = settingsContext.getActiveSimilarityIds()
        resetImagesSized();
        setImagesHidden(true);
        loader.loadImagesFromLocalAPI(id, activeCriteriaIDs, settingsContext.imgAmount, setimages);
        settingsContext.calcSizingRuleIdx()
    }

    const setSingleImageSized = (id: number) => {
        setimages(images.map((img) => {
            if (img.id === id) {
                img.loaded = true
            }
            return img
        }))
    }

    const resetImagesSized = () => {
        console.log("reset sized")
        setimages(images.map((img) => {
            img.loaded = false;
            return img
        }))
    }

    const doneLayouting = () => {
        console.log("layouting done")
        setImagesHidden(false);
    }

    const findSimilarsRandom = () => {
        findSimilarImages(-1)
    }

    return <ImageContext.Provider value={{ images, imagesHidden, doneLayouting, findSimilarImages, findSimilarsRandom, setSingleImageSized: setSingleImageSized, resetImagesSized: resetImagesSized }}>
        {children}
    </ImageContext.Provider>
}

export default ImageProvider