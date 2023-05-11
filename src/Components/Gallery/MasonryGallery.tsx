import React from 'react'
import DraggableGrid, { DraggableItem } from 'ruuri'
import GalleryItem from './GalleryItem'
import { ActionsContextType, ImageContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'
import Lightbox from '../Lightbox/Lightbox'
import { ActionsContext } from '../../Contexts/ActionsContext'


export default function MasonryGallery() {
  const gridRef: any = React.useRef(null)
  const imageContext = React.useContext(ImageContext) as ImageContextType
  const actionsContext = React.useContext(ActionsContext) as ActionsContextType

  React.useEffect(() => {
    if (imageContext.images.length === 0) {
      imageContext.findSimilarImages(Math.floor(Math.random() * 50000))
    }
  }, [])


  function resizeOnImgLoad() {
    if (gridRef !== null) {
      gridRef.current.grid.refreshItems().layout()
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
              <DraggableItem key={image.id}>
                <GalleryItem imageData={image} onimgLoad={resizeOnImgLoad} onNextImages={(event) => imageContext.findSimilarImages(image.id)}></GalleryItem>
              </DraggableItem>)
          })
        }

      </DraggableGrid>
    </>
  )
}