import React, { ChangeEvent, useRef } from 'react'
import DraggableGrid, { DraggableItem} from 'ruuri'
import GalleryItem from './GalleryItem'
import GalleryImage from '../../Models/GalleryImage'

type Props = {
  images: GalleryImage[];
}

export default function MasonryGallery(props: Props) {
  const gridRef: any = useRef(null)

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

        {props.images.map((image) => 
          <DraggableItem key={image.id}>
            <GalleryItem imgLink={image.url} onimgLoad={resizeOnImgLoad}></GalleryItem>
          </DraggableItem>
        )}
    </DraggableGrid>
  )
}