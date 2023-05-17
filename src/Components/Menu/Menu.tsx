import React, { MouseEventHandler } from 'react'
import { FaTimes } from 'react-icons/fa'
import SearchOption from './SearchOption'
import { ImageContext } from '../../Contexts/imageContext'
import { ImageContextType } from '../../@types/image'
import AmountSlider from './AmountSlider'
import IconKnob from '../Controls/IconKnob'
import PrimaryButton from '../Controls/PrimaryButton'

type Props = {
    closeAction: MouseEventHandler
}

export default function Menu(props: Props) {
    const imageContext = React.useContext(ImageContext) as ImageContextType
    return (
        <div className='menu-container overlay'>
            <nav>
                <h1>Similallery</h1>
                <div className='quick-controls'>
                    <PrimaryButton onClick={() => { }} text='About'></PrimaryButton>
                    <IconKnob icon={<FaTimes />} onClick={props.closeAction}></IconKnob>
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
                        <SearchOption
                            checked={imageContext.similarityCriterias[index].active}
                            labelText={criteria.title} name={criteria.internalName}
                            onChange={(event) => { imageContext.toggleCriteria(criteria.id) }}
                            imagePath={process.env.PUBLIC_URL + criteria.explainerImgPath}></SearchOption>
                    ))
                }
            </div>
        </div>
        // <ul id="searchoption-container">
        //     <li key={Math.random()}>
        //         <AmountSlider
        //             name="img-amount"
        //             labeltext='Amount of Images'
        //             min={imageContext.AMOUNT_RANGE[0]}
        //             max={imageContext.AMOUNT_RANGE[1]}
        //             startVal={imageContext.imgAmount}
        //             onChange={(event) => { imageContext.setImgAmount(parseInt(event.currentTarget.value || "0")); console.log(imageContext.imgAmount) }
        //             }
        //         ></AmountSlider>
        //     </li>
        //     {
        //         imageContext.similarityCriterias.map((criteria) =>
        //         (
        //             <li key={criteria.id}>
        //                 <SearchOption
        //                     checked={imageContext.similarityCriterias[criteria.id].active}
        //                     labelText={criteria.title} name={criteria.internalName}
        //                     onChange={(event) => { imageContext.toggleCriteria(criteria.id) }}></SearchOption>
        //             </li>
        //         ))
        //     }
        //     <li>
        //         
        //     </li>
        // </ul>
    )
}