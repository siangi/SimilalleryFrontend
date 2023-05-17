import React, { useContext } from 'react'
import { FaCog } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import PrimaryButton from '../Controls/PrimaryButton'
import { ImageContextType, SimilarityCriteria } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'
import { string } from 'yargs'

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
            <h3 id="current-options">Showing images with similar: {similarityCriteriasReducer()}</h3>
            <div className='quick-controls'>
                <IconKnob icon={<FaCog />} onClick={(event: React.MouseEvent) => props.toggleMenu(true)}></IconKnob>
                <PrimaryButton text='random search' onClick={(event) => imageContext.findSimilarsRandom()}></PrimaryButton>
            </div>
        </div>
    )
}