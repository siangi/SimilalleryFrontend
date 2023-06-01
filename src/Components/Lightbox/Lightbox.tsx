import React, { useContext, useRef } from 'react'
import { ActionsContextType } from '../../@types/image'
import { useState } from 'react'
import { ActionsContext } from '../../Contexts/ActionsContext'
import LightboxInfo from './LightboxInfo'

type Props = {}

export default function Lightbox(props: Props) {
    const actionsContext = useContext(ActionsContext) as ActionsContextType
    const imageRef: any = useRef(null)
    const [isImageWide, setIsImageWide] = useState(false)

    function onImageLoaded() {
        //set the image class based on the aspect ratio
        // position the info box properly
        setIsImageWide(imageRef.current.naturalWidth >= imageRef.current.naturalHeight)
    }

    return (
        <div id="lightbox" className='overlay' onClick={actionsContext.closeLightbox}>
            {actionsContext.focusedImage !== null ?
                (<>
                    <img className={`lightbox-image ${isImageWide ? "lightbox-image-wide" : "lightbox-image-tall"}`} src={actionsContext.focusedImage.url} alt={actionsContext.focusedImage.title} onLoad={onImageLoaded} ref={imageRef} />
                    <LightboxInfo imageTitle={actionsContext.focusedImage?.title} artist={actionsContext.focusedImage.artist} category={actionsContext.focusedImage.category}></LightboxInfo>
                </>) : null}
        </div>
    )
}