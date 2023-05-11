import React, {useContext} from 'react'
import {FaCog} from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import PrimaryButton from '../Controls/PrimaryButton'
import { ImageContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'

type Props = {
    toggleMenu: (value: boolean) => void;
}

export default function QuickControls(props: Props) {
    const imageContext = useContext(ImageContext) as ImageContextType
    return (
        <div className='quick-controls'>
            <IconKnob icon={<FaCog />} onClick={(event: React.MouseEvent) => props.toggleMenu(true)}></IconKnob>
            <PrimaryButton text='random search' onClick={(event) => imageContext.findSimilarsRandom()}></PrimaryButton>
        </div>
    )
}