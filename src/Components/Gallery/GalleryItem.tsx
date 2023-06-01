import React, { useContext, useRef, useEffect } from 'react'
import { FaInfo } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import { ActionsContext } from '../../Contexts/ActionsContext'
import { ActionsContextType, IGalleryImage, ImageContextType, SettingsContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'
import { SettingsContext } from '../../Contexts/SettingsContext'

type Props = {
  imageData: IGalleryImage;
  onimgLoad: (id: number) => void;
  onNextImages: (event: any) => void;
}

export default function GalleryItem(props: Props) {
  const actionsContext = useContext(ActionsContext) as ActionsContextType;
  const settingsContext = useContext(SettingsContext) as SettingsContextType
  const imgRef: any = useRef(null);
  const gridRef: any = useRef(null);

  useEffect(() => {
    setCalculatedWidth()
  }, [settingsContext.currentSizingRuleIdx])


  function setCalculatedWidth() {
    console.log("calc function call")
    // calc the base width and increase from the amount of images
    // the size class should probably be on the image context so it can be controlled from the outside
    let sizingRule = settingsContext.SIZING_RULES[settingsContext.currentSizingRuleIdx];
    if (imgRef.current == null) {
      return
    }

    if (props.imageData.isMain) {
      imgRef.current.style.width = `calc(${sizingRule.baseMainImg} + ${sizingRule.increaseMainImg} * ${imgRef.current.naturalWidth}/ 1400)`
      imgRef.current.classList.toggle("main-image", true)
    } else {
      imgRef.current.style.width = `calc(${sizingRule.base} + ${sizingRule.increase} * ${imgRef.current.naturalWidth} / 1400)`
    }
  }

  function imageLoadHandler() {
    setCalculatedWidth()
    gridRef.current.classList.toggle("hidden")
    props.onimgLoad(props.imageData.id)
  }


  return (
    <div className='gallery-item-grid hidden' ref={gridRef}>
      <img className='gallery-item-img' alt={props.imageData.title} ref={imgRef} src={props.imageData.url} onClick={props.onNextImages} onLoad={imageLoadHandler}></img>
      <IconKnob positioningClass="gallery-item-button" icon={<FaInfo />} onClick={(event) => { actionsContext.openLightbox(props.imageData) }}></IconKnob>
    </div>
  )
}