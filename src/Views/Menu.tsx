import React, { MouseEventHandler } from 'react'
import { Link } from "react-router-dom"
import { FaTimes } from 'react-icons/fa'

import SearchOption from '../Components/Menu/SearchOption'
import { ImageContext } from '../Contexts/imageContext'
import { ImageContextType } from '../@types/image'
import AmountSlider from '../Components/Menu/AmountSlider'
import IconKnob from '../Components/Controls/IconKnob'
import PrimaryButton from '../Components/Controls/PrimaryButton'
import SplitGrid from '../Components/Layouts/SplitGrid'

type Props = {
}

export default function Menu(props: Props) {
    const imageContext = React.useContext(ImageContext) as ImageContextType
    return (
        <div className='menu-container'>
            <nav>
                <h1>Similallery</h1>
                <div className='quick-controls'>
                    <PrimaryButton onClick={() => { }} text='About'></PrimaryButton>
                    <Link to="/">
                        <IconKnob icon={<FaTimes />} onClick={() => { }}></IconKnob>
                    </Link>
                </div>
            </nav>

            <div className='search-option-container'>
                <div className='amount-container'>
                    <AmountSlider
                        name="img-amount"
                        labeltext='Amount of Images'
                        min={imageContext.AMOUNT_RANGE[0]}
                        max={imageContext.AMOUNT_RANGE[1]}
                        startVal={imageContext.imgAmount}
                        onChange={(newVal, thumb) => { imageContext.setImgAmount(newVal) }
                        }
                    ></AmountSlider>
                </div>
                {
                    imageContext.similarityCriterias.map((criteria, index) => (
                        <SplitGrid
                            titleElement={
                                <SearchOption
                                    checked={imageContext.similarityCriterias[index].active}
                                    labelText={criteria.title} name={criteria.internalName}
                                    onChange={(event) => { imageContext.toggleCriteria(criteria.id) }}></SearchOption>
                            }
                            imageElement={
                                <img src={process.env.PUBLIC_URL + criteria.explainerImgPath} alt={`Explainer Image for ${criteria.title}`}></img>
                            }
                            description="testdescription"
                        ></SplitGrid>
                    ))
                }
            </div>
        </div>
    )
}