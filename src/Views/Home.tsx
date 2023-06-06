import React, { useRef } from 'react'
import Lightbox from '../Components/Lightbox/Lightbox'
import MasonryGallery from '../Components/Gallery/MasonryGallery'
import QuickControls from '../Components/Menu/QuickControls'
import { ActionsContext } from '../Contexts/ActionsContext'
import { ActionsContextType } from '../@types/image'

type Props = {}

export default function Home(props: Props) {
    const overflowRef: any = useRef(null)
    const actionsContext = React.useContext(ActionsContext) as ActionsContextType

    function checkForOverfow(): Boolean {
        return overflowRef.current.scrollHeight > overflowRef.current.clientHeight
    }

    return (
        <div className='main-page'>
            {actionsContext.isLightboxOpen ? <Lightbox></Lightbox> : null}
            <QuickControls toggleMenu={(value: boolean) => console.log("menu toggled")}></QuickControls>
            <MasonryGallery overflowChecker={checkForOverfow}></MasonryGallery>
        </div>
    )
}