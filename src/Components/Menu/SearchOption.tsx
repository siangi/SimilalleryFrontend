import React from 'react'
import { ChangeEventHandler } from 'react'

type Props = {
  labelText: string
  name: string
  onChange: ChangeEventHandler
  checked: boolean
}

export default function SearchOption(props: Props) {
  return (
    <label htmlFor={props.name} className='menuItem searchOption'>
      <input type='checkbox' id={props.name} name={props.name} checked={props.checked} onChange={props.onChange} ></input>
      {props.labelText}
    </label>
  )
}