import React, { ChangeEvent } from 'react'
import DraggableGrid, { DraggableItem} from 'ruuri'
import GalleryItem from './GalleryItem'
import GalleryImage from '../../Models/GalleryImage'

type Props = {
  images: GalleryImage[];
}

export default function MasonryGallery(props: Props) {
  
  return (
    <DraggableGrid
      containerClass='grid'
      dragEnabled={false}
      itemClass='grid-item-container'
      layout={{
        fillGaps: false
      }}>

        {props.images.map((image) => 
          <DraggableItem key={image.id}>
            <GalleryItem imgLink={image.url} onimgLoad={(event: ChangeEvent) => {}}></GalleryItem>
          </DraggableItem>
        )}
    </DraggableGrid>
  )
}