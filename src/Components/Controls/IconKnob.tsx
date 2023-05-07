import React, { ReactNode } from 'react'

type Props = {
  positioningClass?: string;
  onClick: React.MouseEventHandler;
  icon: ReactNode;
}

export default function IconKnob(props: Props) {
  return (
    <button className={props.positioningClass} onClick={props.onClick}>
      {props.icon}
    </button>
  )
}
