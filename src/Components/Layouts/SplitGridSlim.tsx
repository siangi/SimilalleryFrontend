import React from 'react'

type Props = {
    descriptionElement: JSX.Element,
    descriptionFilled: boolean,
    imageElement: JSX.Element
}

export default function SplitGridSlim(props: Props) {
  return (
    <div className='split-grid slim-grid'>
        <div className='split-grid-image'>
            {props.imageElement}
        </div>
        <div className={`split-grid-text ${props.descriptionFilled ? "filled": ""}`}>
            {props.descriptionElement}
        </div>
    </div>
  )
}