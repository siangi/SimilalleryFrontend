import React from 'react'
import DraggableGrid, { DraggableItem } from 'ruuri'
import GalleryItem from './GalleryItem'
import { ActionsContextType, ImageContextType, SettingsContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'
import Lightbox from '../Lightbox/Lightbox'
import { ActionsContext } from '../../Contexts/ActionsContext'
import { SettingsContext } from '../../Contexts/SettingsContext'

type Props = {
  overflowChecker: () => Boolean;
  setOnStartOverflowing: (func: () => void) => void;
}

export default function MasonryGallery(props: Props) {
  const gridRef: any = React.useRef(null)
  const imageContext = React.useContext(ImageContext) as ImageContextType
  const settingsContext = React.useContext(SettingsContext) as SettingsContextType
  const actionsContext = React.useContext(ActionsContext) as ActionsContextType

  React.useEffect(() => {
    props.setOnStartOverflowing(handleOverflow)
    if (imageContext.images.length === 0) {
      imageContext.findSimilarsRandom();
    }
  })


  function layoutOnLoad() {
    if (gridRef !== null) {
      gridRef.current.grid.refreshItems().layout()
    }
  }

  function handleOverflow() {
    if (settingsContext.currentSizingRuleIdx < settingsContext.SIZING_RULES.length - 1) {
      const newRule = settingsContext.currentSizingRuleIdx + 1
      settingsContext.setCurrentSizingRuleIdx(newRule)
      console.log(`sizing rule set to ${newRule}`)
      layoutOnLoad()
    }
  }

  function imageLoadedHandler(id: number) {

    imageContext.setSingleImageLoaded(id)
    if (imageContext.images.filter((image) => image.loaded).length == imageContext.images.length) {
      layoutOnLoad()
    }
    props.overflowChecker()
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
                <GalleryItem imageData={image} onimgLoad={(imageLoadedHandler)} onNextImages={(event) => imageContext.findSimilarImages(image.id)}></GalleryItem>
              </DraggableItem>)
          })
        }

      </DraggableGrid>
    </>
  )
}