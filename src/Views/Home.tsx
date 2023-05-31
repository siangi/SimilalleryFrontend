import React from 'react'
import MasonryGallery from '../Components/Gallery/MasonryGallery'
import QuickControls from '../Components/Menu/QuickControls'

type Props = {}

export default function Home(props: Props) {
    return (
        <div className='main-page'>
            <QuickControls toggleMenu={(value: boolean) => console.log("menu toggled")}></QuickControls>
            <MasonryGallery></MasonryGallery>
        </div>
    )
}