import React, {FC} from 'react'
import {IconType} from '../../resources/icon'

const Icon: FC<Props> = ({icon}): JSX.Element => {
    return <svg viewBox={icon.viewBox}>
        <path d={icon.d}/>
    </svg>
}

type Props = {
    icon: IconType
}

export default Icon
