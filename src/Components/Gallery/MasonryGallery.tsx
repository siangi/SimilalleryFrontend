import React, { useState } from 'react'
import DraggableGrid, { DraggableItem } from 'ruuri'
import GalleryItem from './GalleryItem'
import { ActionsContextType, ImageContextType, SettingsContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'
import Lightbox from '../Lightbox/Lightbox'
import { ActionsContext } from '../../Contexts/ActionsContext'
import { SettingsContext } from '../../Contexts/SettingsContext'

type Props = {
  overflowChecker: () => Boolean;
}

export default function MasonryGallery(props: Props) {
  const gridRef: any = React.useRef(null)
  const imageContext = React.useContext(ImageContext) as ImageContextType
  const settingsContext = React.useContext(SettingsContext) as SettingsContextType
  const actionsContext = React.useContext(ActionsContext) as ActionsContextType

  React.useEffect(() => {
    // props.setOnStartOverflowing(handleOverflow)
    // if (imageContext.images.length === 0) {
    //   imageContext.findSimilarsRandom();
    // }
  })


  function layoutGrid() {
    if (gridRef !== null) {
      gridRef.current.grid.refreshItems().layout()
    }
  }

  function handleOverflow() {
    console.log("handleOverflow")
    if (settingsContext.currentSizingRuleIdx < settingsContext.SIZING_RULES.length - 1) {
      imageContext.resetImagesSized();
      const newRule = settingsContext.currentSizingRuleIdx + 1
      settingsContext.setCurrentSizingRuleIdx(newRule)
    }
  }

  function imageSizedHandler(id: number) {
    imageContext.setSingleImageSized(id)
    if (imageContext.images.length > 0 && imageContext.images.filter((image) => image.loaded).length === imageContext.images.length) {
      layoutGrid()
      if (props.overflowChecker()) {
        handleOverflow()
      } else {
        imageContext.doneLayouting()
      }
    }
  }

  return (
    <>
      {actionsContext.isLightboxOpen ? <Lightbox></Lightbox> : null}
      <DraggableGrid
        containerClass='grid'
        dragEnabled={false}
        itemClass='gallery-item-container'
        layout={{
          fillGaps: false
        }}
        ref={gridRef}>

        {
          imageContext.images.map((image) => {
            return (
              // isMain has to be included in the key, otherwise it will not recognise that an image has changed to mainImage 
              // and will not update the component with the proper style
              <DraggableItem key={image.id.toString() + image.isMain.toString()}>
                <GalleryItem className={imageContext.imagesHidden ? "see-through" : ""}
                  imageData={image}
                  onimgSized={(imageSizedHandler)}
                  onNextImages={(event) => imageContext.findSimilarImages(image.id)}></GalleryItem>
              </DraggableItem>)
          })
        }

      </DraggableGrid>
    </>
  )
}