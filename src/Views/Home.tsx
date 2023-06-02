import React, { useEffect, useRef, useState, useContext } from 'react'
import MasonryGallery from '../Components/Gallery/MasonryGallery'
import QuickControls from '../Components/Menu/QuickControls'
import { ImageContext } from '../Contexts/imageContext'
import { ImageContextType } from '../@types/image'

type Props = {}

export default function Home(props: Props) {
    const overflowRef: any = useRef(null)


    function checkForOverfow(): Boolean {
        return overflowRef.current.scrollHeight > overflowRef.current.clientHeight
    }

    return (
        <div className='main-page'>
            <QuickControls toggleMenu={(value: boolean) => console.log("menu toggled")}></QuickControls>
            <div ref={overflowRef} className='overflow-checker'>
                <MasonryGallery overflowChecker={checkForOverfow}></MasonryGallery>
            </div>
        </div>
    )
}