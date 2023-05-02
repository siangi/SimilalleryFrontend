import React from 'react'
import DraggableGrid, { DraggableItem} from 'ruuri'
import GalleryItem from './GalleryItem'
import { ImageContextType } from '../../@types/image'
import { ImageContext } from '../../Contexts/imageContext'


export default function MasonryGallery() {
  const gridRef: any = React.useRef(null)
  const imageContext = React.useContext(ImageContext) as ImageContextType
  React.useEffect(() => {
    if (imageContext.images.length === 0){
      imageContext.findSimilarImages(Math.floor(Math.random() * 50000))
    }
  }, [imageContext])
  

  function resizeOnImgLoad(){
    if (gridRef !== null){
      gridRef.current.grid.refreshItems().layout()
    }
  }
  
  return (
    <DraggableGrid
      containerClass='grid'
      dragEnabled={false}
      itemClass='grid-item-container'
      layout={{
        fillGaps: false
      }}
      ref={gridRef}>

        {imageContext.images.map((image) => 
          <DraggableItem key={image.id}>
            <GalleryItem imgLink={image.url} onimgLoad={resizeOnImgLoad} isImgMain={image.isMain}></GalleryItem>
          </DraggableItem>
        )}
    </DraggableGrid>
  )
}