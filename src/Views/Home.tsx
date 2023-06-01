import React, { useEffect, useRef, useState } from 'react'
import MasonryGallery from '../Components/Gallery/MasonryGallery'
import QuickControls from '../Components/Menu/QuickControls'

type Props = {}

export default function Home(props: Props) {
    const overflowRef: any = useRef(null)
    const [isOverflowing, setIsOverflowing] = useState(false)
    let overflowHandler: () => void = () => { console.log("no overflowhandler provided") };

    useEffect(() => {
        if (isOverflowing) {
            overflowHandler();
            // console.log("called Overflow Handler")
        }
        // console.log("changed isOverflowing to " + isOverflowing)
    }, [isOverflowing])


    function checkForOverfow(): Boolean {
        if (overflowRef !== null) {
            const newIsOverflowing = overflowRef.current.scrollHeight > overflowRef.current.clientHeight
            if (newIsOverflowing !== isOverflowing) {
                setIsOverflowing(newIsOverflowing)
            }
            return isOverflowing
        } else {
            return false
        }
    }

    function setOverflowHandler(func: () => void) {
        overflowHandler = func;
    }
    return (
        <div className='main-page'>
            <QuickControls toggleMenu={(value: boolean) => console.log("menu toggled")}></QuickControls>
            <div ref={overflowRef} className='overflow-checker'>
                <MasonryGallery overflowChecker={checkForOverfow} setOnStartOverflowing={setOverflowHandler}></MasonryGallery>
            </div>
        </div>
    )
}