import React from 'react'

type Props = {
    titleElement: JSX.Element,
    description: string,
    imageElement: JSX.Element
}

export default function SplitGrid(props: Props) {
    return (
        <div className='split-grid'>
            <div className='split-grid-image'>
                {props.imageElement}
            </div>
            <div className='split-grid-title'>
                {props.titleElement}
            </div>
            <div className='split-grid-text'>
                <p>{props.description}</p>
            </div>
        </div >
    )
}