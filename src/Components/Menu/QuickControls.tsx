import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { FaRandom, FaQuestion } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import { ImageContextType, SettingsContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'
import CheckboxChip from '../Controls/CheckboxChip'
import { SettingsContext } from '../../Contexts/SettingsContext'

type Props = {
    toggleMenu: (value: boolean) => void;
}

export default function QuickControls(props: Props) {
    const imageContext = useContext(ImageContext) as ImageContextType
    const settingsContext = useContext(SettingsContext) as SettingsContextType
    return (
        <div className='small-menu'>
            <div className='criteria-chip-container'>
                {
                    settingsContext.similarityCriterias.map((criteria, idx) => (
                        <CheckboxChip
                            checked={settingsContext.similarityCriterias[idx].active}
                            labelText={criteria.title}
                            name={criteria.internalName}
                            onChange={() => settingsContext.toggleCriteria(criteria.id)}
                            icon={criteria.icon}
                            key={idx}
                        ></CheckboxChip>
                    ))
                }
            </div>
            <div className='quick-controls'>
                <Link to="menu">
                    <IconKnob icon={<FaQuestion />} onClick={() => { }}></IconKnob>
                </Link>
                <IconKnob icon={<FaRandom />} onClick={(event) => imageContext.findSimilarsRandom()}></IconKnob>
            </div>
        </div>
    )
}