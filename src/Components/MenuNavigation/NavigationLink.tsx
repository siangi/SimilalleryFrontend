import React from 'react'

type Props = {
    onClick: () => void,
    isActive: boolean,
    title: string,
}

export default function NavigationLink(props: Props) {
  return (
    <li className={`menu-link ${props.isActive ? "filled": ""}`} onClick={props.onClick}>{props.title}</li>
  )
}