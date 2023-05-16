import React from 'react'
import { ChangeEventHandler } from 'react'

type Props = {
  labelText: string
  imagePath: string
  name: string
  onChange: ChangeEventHandler
  checked: boolean
}

export default function SearchOption(props: Props) {
  return (
    <div className='option-card'>
      <img src={props.imagePath} alt={`explainer for ${props.labelText}`}></img>
      <label htmlFor={props.name} className='menuItem searchOption'>
        <input type='checkbox' id={props.name} name={props.name} checked={props.checked} onChange={props.onChange} ></input>
        {props.labelText}
      </label>
    </div>
  )
}