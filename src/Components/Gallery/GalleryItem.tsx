import React, { useRef, useState } from 'react'
type Props = {
    onimgLoad: () => void
    imgLink: string
}

export default function GalleryItem(props: Props) {
  const imageRef: any = useRef(null)

  function setCalculatedWidth(){
    let itemElem: Element;
    if(imageRef.current == null){
      return
    }
    console.log(imageRef.current.naturalWidth)
    imageRef.current.style.width= "calc(5vw + 18vw * " + imageRef.current.naturalWidth + "/ 1400)"
    imageRef.current.classList.toggle("hidden")
    props.onimgLoad()
  }
  return (
    <img className='grid-item hidden' ref={imageRef} src={props.imgLink} onLoad={setCalculatedWidth}></img>
  )
}