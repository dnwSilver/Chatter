import React, {FC} from 'react'
import styles from './Header.module.scss'

const Header: FC<PropsType> = ({title}) => {
    return <div className={styles.header}>
        {title}
    </div>
}
export type PropsType = {
    title: string
}

export default Header
