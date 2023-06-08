import React, { useState } from 'react'
import { FaPalette, FaMapMarkerAlt, FaChartPie, FaDraftingCompass } from "react-icons/fa";
import { SettingsContextType, SimilarityCriteria, GallerySizingRule } from '../@types/image'

type Props = {
    children: any
}

export const SettingsContext = React.createContext<SettingsContextType | null>(null)

function SettingsProvider(props: Props) {
    const AMOUNT_RANGE = [4, 24]
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

    const [currentSizingRuleIdx, setCurrentSizingRuleIdx] = useState(0)
    const SIZING_RULES: Array<GallerySizingRule> = [
        {
            base: "10vw",
            increase: "20vw",
            baseMainImg: "18vw",
            increaseMainImg: "25vw",
            maxImageCount: 4
        },
        {
            base: "5vw",
            increase: "18vw",
            baseMainImg: "15vw",
            increaseMainImg: "16vw",
            maxImageCount: 10
        },
        {
            base: "5vw",
            increase: "12vw",
            baseMainImg: "10vw",
            increaseMainImg: "15vw",
            maxImageCount: 16
        },
        {
            base: "3vw",
            increase: "12vw",
            baseMainImg: "8vw",
            increaseMainImg: "15vw",
            maxImageCount: 24,
        },
        {
            base: "3vw",
            increase: "8vw",
            baseMainImg: "8vw",
            increaseMainImg: "11vw",
            maxImageCount: 32,
        },
        {
            base: "3vw",
            increase: "5vw",
            baseMainImg: "5vw",
            increaseMainImg: "7vw",
            maxImageCount: 75,
        }
    ]

    // get most fitting sizing rule based on the amount of images, to prevent overflow
    function calcSizingRuleIdx() {
        let provisionalIdx = SIZING_RULES.findIndex((rule) => rule.maxImageCount >= imgAmount)
        setCurrentSizingRuleIdx(provisionalIdx >= 0 ? provisionalIdx : SIZING_RULES.length - 1)
    }

    // for the API call
    function getActiveSimilarityIds(): number[] {
        const activeCriteriaIDs: number[] = []

        similarityCriterias.forEach(element => {
            if (element.active) {
                activeCriteriaIDs.push(element.id)
            }
        });

        return activeCriteriaIDs
    }

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
        <SettingsContext.Provider value={{ similarityCriterias, AMOUNT_RANGE, imgAmount, setImgAmount, toggleCriteria, SIZING_RULES, currentSizingRuleIdx, calcSizingRuleIdx, setCurrentSizingRuleIdx, getActiveSimilarityIds }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider