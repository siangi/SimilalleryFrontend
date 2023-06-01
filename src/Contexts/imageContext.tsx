import React, { useEffect } from "react";
import { useState } from "react";
import { FaPalette, FaMapMarkerAlt, FaChartPie, FaDraftingCompass } from "react-icons/fa";
import { IGalleryImage, ImageContextType, SimilarityCriteria } from "../@types/image";
import ImageLoader from "../Models/ImageLoader";


type Props = {
    children: any
}

export const ImageContext = React.createContext<ImageContextType | null>(null);

const ImageProvider = ({ children }: Props) => {
    // get this from the API?
    const [similarityCriterias, setSimilarityCriterias] = useState<SimilarityCriteria[]>([
        { id: 0, title: "Color Palette", description: "In Images with a similar color palette the three most dominant colors are equal, for example the brown of the path in the left image and of the garment in the right image. ", internalName: "palette", active: true, explainerImgPath: "/images/Explainers/Palette.png", icon: <FaPalette /> },
        { id: 1, title: "Color Distribution", description: "With this criteria the areas of the most dominant colors in the image are compared. In the right image, the white base color covers an area of the same size as the brown of the path in the left image.", internalName: "paletteratios", active: false, explainerImgPath: "/images/Explainers/PalRatio.png", icon: <FaChartPie /> },
        { id: 2, title: "Edge Orientation", description: "Here the angle (or orientation) of all the edges in the images are grouped and counted. The images displayed shwo a similar amount of edges with the same orientation.", internalName: "edgeorient", active: false, explainerImgPath: "/images/Explainers/EdgeOrientation.png", icon: <FaDraftingCompass /> },
        { id: 4, title: "Subject Position", description: "An Algorithm designates the most salient part of an image as the Subject. The position of this is compared. If it represents the acutal subject of the image is up for discussion, especially in abstract geometric works. So a little detective work from you is needed.", internalName: "saliencyrect", active: true, explainerImgPath: "/images/Explainers/SubjectPosition.png", icon: <FaMapMarkerAlt /> }
    ])
    const AMOUNT_RANGE = [4, 30]
    const [imgAmount, setImgAmount] = useState<number>(16)
    const [images, setimages] = useState<IGalleryImage[]>([]);

    const toggleCriteria = (id: number) => {
        setSimilarityCriterias(similarityCriterias.map((criteria) => {

            if (criteria.id === id) {
                if (!(criteria.active && similarityCriterias.reduce((prev, current) => prev + (current.active ? 1 : 0), 0) === 1)) {
                    criteria.active = !criteria.active;
                }
            }

            return criteria
        }))
    }

    useEffect(() => {
        if (images.length > 0) {
            findSimilarImages(images[0].id)
        }
    }, [similarityCriterias, imgAmount])


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