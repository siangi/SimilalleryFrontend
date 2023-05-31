import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { FaCog, FaRandom, FaPalette, FaMapMarkerAlt } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import PrimaryButton from '../Controls/PrimaryButton'
import { ImageContextType, SimilarityCriteria } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'
import { string } from 'yargs'
import CheckboxChip from '../Controls/CheckboxChip'

type Props = {
    toggleMenu: (value: boolean) => void;
}

export default function QuickControls(props: Props) {
    function similarityCriteriasReducer() {
        return imageContext.similarityCriterias.filter((val) => val.active).map((val) => val.title).join(" / ")
    }
    const imageContext = useContext(ImageContext) as ImageContextType
    return (
        <div className='small-menu'>
            <CheckboxChip
                checked={true}
                icon={<FaPalette></FaPalette>}
                name='palette'
                labelText='palette'
                onChange={() => {}}></CheckboxChip>
            <CheckboxChip
                checked={false}
                icon={<FaMapMarkerAlt></FaMapMarkerAlt>}
                name='slaiency'
                labelText='slaiency'
                onChange={() => {}}></CheckboxChip>
            <Link to="menu">
                <IconKnob icon={<FaCog />} onClick={() => { }}></IconKnob>
            </Link>
            <IconKnob icon={<FaRandom />} onClick={(event) => imageContext.findSimilarsRandom()}></IconKnob>
        </div>
    )
}