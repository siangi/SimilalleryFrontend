import React, { useContext, useRef } from 'react'
import { FaInfo } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import { ActionsContext } from '../../Contexts/ActionsContext'
import { ActionsContextType, IGalleryImage } from '../../@types/image'

type Props = {
  imageData: IGalleryImage;
  onimgLoad: () => void;
  onNextImages: (event: any) => void;
}

export default function GalleryItem(props: Props) {
  const actionsContext = useContext(ActionsContext) as ActionsContextType;
  const imgRef: any = useRef(null);
  const gridRef: any = useRef(null);

  function setCalculatedWidth() {
    if (imgRef.current == null) {
      return
    }
    if (props.imageData.isMain) {
      imgRef.current.style.width = "calc(15vw + 17vw * " + imgRef.current.naturalWidth + "/ 1400)"
      imgRef.current.classList.toggle("main-image", true)
    } else {
      imgRef.current.style.width = "calc(5vw + 18vw * " + imgRef.current.naturalWidth + "/ 1400)"
    }
    gridRef.current.classList.toggle("hidden")
    props.onimgLoad()
  }


  return (
    <div className='gallery-item-grid hidden' ref={gridRef}>
      <img className='gallery-item-img' alt={props.imageData.title} ref={imgRef} src={props.imageData.url} onClick={props.onNextImages} onLoad={setCalculatedWidth}></img>
      <IconKnob positioningClass="gallery-item-button" icon={<FaInfo />} onClick={(event) => { actionsContext.openLightbox(props.imageData) }}></IconKnob>
    </div>
  )
}