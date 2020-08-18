import React, {ReactNode} from 'react'
import styles from './Panel.module.scss'

type PropsType = {
    title: string
    content: ReactNode
}

const Panel = (props: PropsType) => {
    return <div className={styles.panel}>
        <div className={styles.title}>
            {props.title}
        </div>
        <div className={styles.content}>
            {props.content}
        </div>
    </div>
}

export default Panel
