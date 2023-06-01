import React, { useState } from 'react'
import { FaPalette, FaMapMarkerAlt, FaChartPie, FaDraftingCompass } from "react-icons/fa";
import { SettingsContextType, SimilarityCriteria } from '../@types/image'
import { ImageContext } from './imageContext';

type Props = {
    children: any
}

export const SettingsContext = React.createContext<SettingsContextType | null>(null)

function SettingsProvider(props: Props) {
    const AMOUNT_RANGE = [4, 30]
    const [imgAmount, setImgAmount] = useState<number>(16)
    const [similarityCriterias, setSimilarityCriterias] = useState<SimilarityCriteria[]>([
        {
            id: 0,
            title: "Color Palette",
            description: "In Images with a similar color palette the three most dominant colors are equal, for example the brown of the path in the left image and of the garment in the right image. ",
            internalName: "palette",
            active: true,
            explainerImgPath: "/images/Explainers/Palette.png",
            icon: <FaPalette />
        },
        {
            id: 1,
            title: "Color Distribution",
            description: "With this criteria the areas of the most dominant colors in the image are compared. In the right image, the white base color covers an area of the same size as the brown of the path in the left image.",
            internalName: "paletteratios",
            active: false,
            explainerImgPath: "/images/Explainers/PalRatio.png",
            icon: <FaChartPie />
        },
        {
            id: 2,
            title: "Edge Orientation",
            description: "Here the angle (or orientation) of all the edges in the images are grouped and counted. The images displayed shwo a similar amount of edges with the same orientation.",
            internalName: "edgeorient",
            active: false,
            explainerImgPath: "/images/Explainers/EdgeOrientation.png",
            icon: <FaDraftingCompass />
        },
        {
            id: 4,
            title: "Subject Position",
            description: "An Algorithm designates the most salient part of an image as the Subject. The position of this is compared. If it represents the acutal subject of the image is up for discussion, especially in abstract geometric works. So a little detective work from you is needed.",
            internalName: "saliencyrect",
            active: true,
            explainerImgPath: "/images/Explainers/SubjectPosition.png",
            icon: <FaMapMarkerAlt />
        }
    ])

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

    return (
        <SettingsContext.Provider value={{ similarityCriterias, AMOUNT_RANGE, imgAmount, setImgAmount, toggleCriteria }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider