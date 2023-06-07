import React, { useContext, useRef } from 'react'
import { FaInfo } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
import { ActionsContext } from '../../Contexts/ActionsContext'
import { ActionsContextType, IGalleryImage, SettingsContextType } from '../../@types/image'
import { SettingsContext } from '../../Contexts/SettingsContext'

type Props = {
  imageData: IGalleryImage;
  onimgSized: () => void;
  onNextImages: (event: any) => void;
}

export default function GalleryItem(props: Props) {
  const actionsContext = useContext(ActionsContext) as ActionsContextType;
  const settingsContext = useContext(SettingsContext) as SettingsContextType
  const imgRef: any = useRef(null);
  const gridRef: any = useRef(null);

  // calculate the width based on a size class, so each image gets about an equal mount of space
  function setCalculatedWidth() {
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

    gridRef.current.classList.toggle("no-display", false)
  }

  function imageLoadHandler() {
    setCalculatedWidth()
    props.onimgSized();
  }

  return (
    <div className='gallery-item-grid no-display' ref={gridRef}>
      <img
        className={`gallery-item-img`}
        alt={props.imageData.title} ref={imgRef} src={props.imageData.url}
        onClick={props.onNextImages} onLoad={imageLoadHandler}></img>
      <IconKnob
        className="gallery-item-button"
        icon={<FaInfo />}
        onClick={(event) => { actionsContext.openLightbox(props.imageData) }}></IconKnob>
    </div>
  )
}