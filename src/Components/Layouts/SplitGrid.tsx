import React from 'react'

type Props = {
    titleElement: JSX.Element,
    descriptionElement: JSX.Element,
    imageElement: JSX.Element
    titleFilled: boolean;
}

export default function SplitGrid(props: Props) {
    return (
        <div className='split-grid full-grid'>
            <div className='split-grid-image'>
                {props.imageElement}
            </div>
            <div className={`split-grid-title ${props.titleFilled ? "filled": ""}`}>
                {props.titleElement}
            </div>
            <div className='split-grid-text'>
                {props.descriptionElement}
            </div>
        </div >
    )
}