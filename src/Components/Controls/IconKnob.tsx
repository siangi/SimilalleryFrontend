import React, { ReactNode } from 'react'

type Props = {
  className?: string;
  onClick: React.MouseEventHandler;
  icon: ReactNode;
}

export default function IconKnob(props: Props) {
  return (
    <button className={props.className + " icon-knob"} onClick={props.onClick}>
      {props.icon}
    </button>
  )
}
