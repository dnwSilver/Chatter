import React, {FC, ReactNode} from 'react'
import styles from './Panel.module.scss'

const Panel: FC<Props> = ({title, content}) => {
    return <div className={styles.panel}>
        <div className={styles.title}>
            {title}
        </div>
        <div className={styles.content}>
            {content}
        </div>
    </div>
}

type Props = {
    title: string
    content: ReactNode
}

export default Panel
