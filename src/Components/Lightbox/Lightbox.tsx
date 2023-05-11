import React, { useContext, useRef } from 'react'
import { ImageContext } from '../../Contexts/imageContext'
import { ActionsContextType, ImageContextType } from '../../@types/image'
import GalleryImage from '../../Models/GalleryImage'
import { useState } from 'react'
import { ActionsContext } from '../../Contexts/ActionsContext'

type Props = {}

export default function Lightbox({ }: Props) {
    const imageContext = useContext(ImageContext) as ImageContextType
    const actionsContext = useContext(ActionsContext) as ActionsContextType
    const imageRef: any = useRef(null)
    
    function onImageLoaded(){
        //set the image class based on the aspect ratio
        // position the info box properly
        if(imageRef.current.naturalWidth >= imageRef.current.naturalHeight){
            imageRef.current.classList.toggle("lightbox-image-wide", true)
        } else {
            // image should be tall, box on the right, at the bottom
            imageRef.current.classList.toggle("lightbox-image-tall", true)
        }

        imageRef.current.classList.toggle("hidden", false)
    }

    return (
        <div id="lightbox" onClick={actionsContext.closeLightbox}>
            {actionsContext.focusedImage !==  null? <img className="lightbox-image hidden" src={actionsContext.focusedImage.url} alt={actionsContext.focusedImage.title} onLoad={onImageLoaded} ref={imageRef}/> : null}
        </div>
    )
}