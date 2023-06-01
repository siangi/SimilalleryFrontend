import React, { useRef } from 'react'
import MasonryGallery from '../Components/Gallery/MasonryGallery'
import QuickControls from '../Components/Menu/QuickControls'

type Props = {}

export default function Home(props: Props) {
    const overflowRef: any = useRef(null)

    function checkForOverfow(): Boolean {
        if (overflowRef !== null) {
            return overflowRef.current.scrollHeight > overflowRef.current.clientHeight
        } else {
            return false
        }
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