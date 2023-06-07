import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    route: string,
    isActive: boolean,
    title: string,
}

export default function NavigationLink(props: Props) {
  return (
    <Link className={`nav-link ${props.isActive ? "filled": ""}`} to={props.route}>{props.title}</Link>
  )
}