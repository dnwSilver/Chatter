import React, {FC} from 'react'
import {IconType} from '../../resources/icon'

type PropsType = {
    icon: IconType
}

const Icon: FC<PropsType> = (props: PropsType) => {
    return <svg viewBox={props.icon.viewBox}>
        <path d={props.icon.d}/>
    </svg>
}

export default Icon
