import React, { useRef, useState } from 'react'
import { FaInfo } from 'react-icons/fa'
import IconKnob from '../Controls/IconKnob'
type Props = {
    description: string
    onimgLoad: () => void
    onNextImages: (event: any) => void
    imgLink: string
    imgID: number
    isImgMain: boolean
}

export default function GalleryItem(props: Props) {
  const imgRef: any = useRef(null)
  const gridRef: any = useRef(null)

  function setCalculatedWidth(){
    if(imgRef.current == null){
      return
    }
    if(props.isImgMain){
      imgRef.current.style.width= "calc(10vw + 20vw * " + imgRef.current.naturalWidth + "/ 1400)"
      imgRef.current.classList.toggle("main-image")
    }else{
      imgRef.current.style.width= "calc(5vw + 18vw * " + imgRef.current.naturalWidth + "/ 1400)"
    }
    
    gridRef.current.classList.toggle("hidden")
    props.onimgLoad()
  }

  return (
    <div className='gallery-item-grid hidden' ref={gridRef}>
      <img className='gallery-item-img' alt={props.description} ref={imgRef} src={props.imgLink} onClick={props.onNextImages} onLoad={setCalculatedWidth}></img>
      <IconKnob positioningClass="gallery-item-button" icon={ <FaInfo/> } onClick={(event) => {console.log("register click")}}></IconKnob>
    </div>
  )
}