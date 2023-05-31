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
    const imageContext = useContext(ImageContext) as ImageContextType
    return (
        <div className='small-menu'>
            {
                imageContext.similarityCriterias.map((criteria, idx) => (
                    <CheckboxChip
                        checked={imageContext.similarityCriterias[idx].active}
                        labelText={criteria.title}
                        name={criteria.internalName}                        
                        onChange={() => imageContext.toggleCriteria(criteria.id)}
                        icon={<FaMapMarkerAlt></FaMapMarkerAlt>}
                        key={idx}
                    ></CheckboxChip>
                ))
            }
            <Link to="menu">
                <IconKnob icon={<FaCog />} onClick={() => { }}></IconKnob>
            </Link>
            <IconKnob icon={<FaRandom />} onClick={(event) => imageContext.findSimilarsRandom()}></IconKnob>
        </div>
    )
}