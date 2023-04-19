import React, { ChangeEvent } from 'react'
type Props = {
    onimgLoad: (a: ChangeEvent) => void
    imgLink: string
}

export default function GalleryItem(props: Props) {
  return (
        <div>
          <img src={props.imgLink}></img>
        </div>
  )
}