import { FaTimes } from 'react-icons/fa';
import React, { ChangeEventHandler } from 'react'

type Props = {
  labelText: string;
  name: string
  icon: JSX.Element;
  onChange: ChangeEventHandler;
  checked: boolean;
}

export default function CheckboxChip(props: Props) {
  return (
    <label className={`chip ${props.checked ? "checked-chip" : "empty-chip"}`}>
      {props.icon}
      <span>{props.labelText}</span>
      <input type="checkbox" id={props.name} name={props.name} checked={props.checked} onChange={props.onChange}></input>
      <FaTimes className={props.checked ? "" : "hidden"}></FaTimes>
    </label>
  )
}