import React, { FormEventHandler } from 'react'
import ReactSlider from 'react-slider'

type Props = {
    name: string,
    labeltext: string,
    min: number,
    max: number,
    startVal: number
    onChange: (newVal: number, thumb: any) => void,
}

export default function AmountSlider(props: Props) {
    return (
        <>
            <label htmlFor={props.name}>
                {props.labeltext}
            </label>
            <ReactSlider
                onChange={props.onChange}
                className='slider'
                thumbClassName='slider-thumb'
                trackClassName='slider-track'
                min={props.min}
                max={props.max}
                defaultValue={props.startVal}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
            {/* <input type="range" className="slider" min={props.min} max={props.max} value={props.startVal} onChange={props.onChange} /> */}

        </>
    )
}