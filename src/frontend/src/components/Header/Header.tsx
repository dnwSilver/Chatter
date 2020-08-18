import React from 'react'
import styles from './Header.module.scss'

export type PropsType = {
    title: string
}

const Header = (props: PropsType) => {
    return <div className={styles.header}>
        {props.title}
    </div>
}

export default Header
