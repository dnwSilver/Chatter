import React from 'react'
import {IconType} from '../../resources/icon'

const Icon = ({icon}: Props) => {
    return <svg viewBox={icon.viewBox}>
        <path d={icon.d}/>
    </svg>
}

type Props = {
    icon: IconType
}

export default Icon
