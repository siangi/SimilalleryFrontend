import React, { useState } from 'react'
import { ActionsContextType } from '../@types/image'
import GalleryImage from '../Models/GalleryImage'

type Props = {
    children: any;
}

export const ActionsContext = React.createContext<ActionsContextType | null>(null)

export default function ActionsProvider(props: Props) {
    const [isLightboxOpen, setIsLightboxOpen] = useState<Boolean>(false)
    const [focusedImage, setFocusedImage] = useState<GalleryImage | null>(null)

    function openLightbox(imageToFocus: GalleryImage) {
        setFocusedImage(imageToFocus)
        setIsLightboxOpen(true)
    }

    function closeLightbox() {
        setIsLightboxOpen(false)
    }



    return (
        <ActionsContext.Provider value={{ isLightboxOpen, focusedImage, openLightbox, closeLightbox }}>
            {props.children}
        </ActionsContext.Provider>
    )
}