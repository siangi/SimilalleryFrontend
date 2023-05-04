import React from 'react'
import SearchOption from './SearchOption'
import { ImageContext } from '../../Contexts/imageContext'
import { ImageContextType } from '../../@types/image'

type Props = {}

export default function Menu(props: Props) {
    const imageContext = React.useContext(ImageContext) as ImageContextType
    return (
        <ul id="menu-container">
            {
                imageContext.similarityCriterias.map((criteria) =>
                (
                    <li key={criteria.id}>
                        <SearchOption checked={imageContext.similarityCriterias[criteria.id].active} labelText={criteria.title} name={criteria.internalName} onChange={(event) => { imageContext.toggleCriteria(criteria.id) }}></SearchOption>
                    </li>
                ))
            }
        </ul>
    )
}