import React, { ReactNode } from 'react'

type Props = {
  onClick: React.MouseEventHandler;
  icon: ReactNode;
}

export default function IconKnob(props: Props) {
  return (
    <button onClick={props.onClick}>
      {props.icon}
    </button>
  )
}
