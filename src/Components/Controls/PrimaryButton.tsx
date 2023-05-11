import React from 'react'

type Props = {
    text: string
    onClick: React.MouseEventHandler;
}

export default function PrimaryButton(props: Props) {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}