import React from "react";
import { useState } from "react";
import { IGalleryImage, ImageContextType, SimilarityCriteria, GallerySizingRule } from "../@types/image";
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
    const AMOUNT_RANGE = [4, 30];
    const [currentSizingRuleIdx, setCurrentSizingRuleIdx] = useState(0)
    const SIZING_RULES: Array<GallerySizingRule> = [
        {
            base: "10vw",
            increase: "20vw",
            baseMainImg: "18vw",
            increaseMainImg: "25vw",
            maxImageCount: 8
        },
        {
            base: "5vw",
            increase: "18vw",
            baseMainImg: "15vw",
            increaseMainImg: "16vw",
            maxImageCount: 16
        },
        {
            base: "5vw",
            increase: "12vw",
            baseMainImg: "10vw",
            increaseMainImg: "15vw",
            maxImageCount: 24
        }
    ]
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
    const setSingleImageLoaded = (id: number) => {
        setimages(images.map((img) => {
            if (img.id === id) {
                img.loaded = true
            }
            return img
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
        let provisionalIdx = SIZING_RULES.findIndex((rule) => rule.maxImageCount >= imgAmount)
        setCurrentSizingRuleIdx(provisionalIdx >= 0 ? provisionalIdx : SIZING_RULES.length - 1)
        console.log("sizing rule index set to: " + currentSizingRuleIdx);
        loader.loadImagesFromLocalAPI(id, activeCriteriaIDs, imgAmount, setimages);
    }

    const findSimilarsRandom = () => {
        findSimilarImages(-1)
    }

    return <ImageContext.Provider value={{ images, similarityCriterias, AMOUNT_RANGE, SIZING_RULES, currentSizingRuleIdx, setCurrentSizingRuleIdx, imgAmount, setImgAmount, setSingleImageLoaded, findSimilarImages, findSimilarsRandom, toggleCriteria }}>
        {children}
    </ImageContext.Provider>
}

export default ImageProvider