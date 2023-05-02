import React, { useRef, useState } from 'react'
type Props = {
    onimgLoad: () => void
    imgLink: string
    isImgMain: boolean
}

export default function GalleryItem(props: Props) {
  const imageRef: any = useRef(null)

  function setCalculatedWidth(){
    if(imageRef.current == null){
      return
    }
    if(props.isImgMain){
      imageRef.current.style.width= "calc(10vw + 20vw * " + imageRef.current.naturalWidth + "/ 1400)"
      imageRef.current.classList.toggle("main-image")
    }else{
      imageRef.current.style.width= "calc(5vw + 18vw * " + imageRef.current.naturalWidth + "/ 1400)"
    }
    
    imageRef.current.classList.toggle("hidden")
    props.onimgLoad()
  }

  return (
    <img className='grid-item hidden' ref={imageRef} src={props.imgLink} onLoad={setCalculatedWidth}></img>
  )
}