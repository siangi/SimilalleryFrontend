import React from 'react'

type Props = {
  imageTitle: string
  artist: string
  category: string
}

export default function LightboxInfo(props: Props) {
  return (
    <div className="lightbox-info">
      <h4>{props.imageTitle}</h4>
      <p>{props.artist} | {props.category}</p>
    </div>
  )
}