import React, { FormEventHandler } from 'react'

type Props = {
    name: string,
    labeltext: string,
    min: number,
    max: number,
    startVal: number
    onChange: FormEventHandler<HTMLInputElement>,
}

export default function AmountSlider(props: Props) {
    return (
        <>
            <label htmlFor={props.name}>
                {props.labeltext}
                <div className='sliderContainer'>
                    <input type="range" className="slider" min={props.min} max={props.max} value={props.startVal} onChange={props.onChange} />
                </div>
            </label>
        </>
    )
}