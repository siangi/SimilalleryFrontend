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
      imageContext.findSimilarsRandom();
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
              // isMain has to be included in the key, otherwise it will not recognise that an image has changed to mainImage 
              // and will not update the component with the proper style
              <DraggableItem key={image.id.toString() + image.isMain.toString()}>
                <GalleryItem imageData={image} onimgLoad={resizeOnImgLoad} onNextImages={(event) => imageContext.findSimilarImages(image.id)}></GalleryItem>
              </DraggableItem>)
          })
        }

      </DraggableGrid>
    </>
  )
}