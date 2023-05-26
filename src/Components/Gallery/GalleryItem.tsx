import React, { useContext, useRef, useEffect } from 'react'
import { FaInfo } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import { ActionsContext } from '../../Contexts/ActionsContext'
import { ActionsContextType, IGalleryImage, ImageContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'

type Props = {
  imageData: IGalleryImage;
  onimgLoad: () => void;
  onNextImages: (event: any) => void;
}

export default function GalleryItem(props: Props) {
  const actionsContext = useContext(ActionsContext) as ActionsContextType;
  const imageContext = useContext(ImageContext) as ImageContextType
  const imgRef: any = useRef(null);
  const gridRef: any = useRef(null);

  useEffect(() => {
    setCalculatedWidth()
  }, [imageContext.currentSizingRuleIdx])


  function setCalculatedWidth() {
    console.log("calc function call")
    // calc the base width and increase from the amount of images
    // the size class should probably be on the image context so it can be controlled from the outside
    let sizingRule = imageContext.SIZING_RULES[imageContext.currentSizingRuleIdx];
    if (imgRef.current == null) {
      return
    }

    if (props.imageData.isMain) {
      imgRef.current.style.width = `calc(${sizingRule.baseMainImg} + ${sizingRule.increaseMainImg} * ${imgRef.current.naturalWidth}/ 1400)`
      imgRef.current.classList.toggle("main-image", true)
    } else {
      imgRef.current.style.width = `calc(${sizingRule.base} + ${sizingRule.increase} * ${imgRef.current.naturalWidth} / 1400)`
    }
    gridRef.current.classList.toggle("hidden")
    props.onimgLoad()
  }


  return (
    <div className='gallery-item-grid hidden' ref={gridRef}>
      {props.imageData.isMain ? <div className='ambient-back gallery-ambience' style={{ "backgroundImage": `url(${props.imageData.url})` }}></div> : null}
      <img className='gallery-item-img' alt={props.imageData.title} ref={imgRef} src={props.imageData.url} onClick={props.onNextImages} onLoad={setCalculatedWidth}></img>
      <IconKnob positioningClass="gallery-item-button" icon={<FaInfo />} onClick={(event) => { actionsContext.openLightbox(props.imageData) }}></IconKnob>
    </div>
  )
}