import React from 'react'
import DraggableGrid, { DraggableItem } from 'ruuri'
import GalleryItem from './GalleryItem'
import { ImageContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'

type Props = {
  overflowChecker: () => Boolean;
}

export default function MasonryGallery(props: Props) {
  const gridRef: any = React.useRef(null)
  const imageContext = React.useContext(ImageContext) as ImageContextType

  React.useEffect(() => {
    if (imageContext.images.length === 0) {
      imageContext.findSimilarsRandom();
    }
  }, [])

  function layoutGrid() {
    if (gridRef !== null) {
      gridRef.current.grid.refreshItems().layout()
    }
  }

  return (
    <>
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
                <GalleryItem
                  imageData={image}
                  onimgSized={layoutGrid}
                  onNextImages={(event) => imageContext.findSimilarImages(image.id)}></GalleryItem>
              </DraggableItem>)
          })
        }

      </DraggableGrid>
    </>
  )
}