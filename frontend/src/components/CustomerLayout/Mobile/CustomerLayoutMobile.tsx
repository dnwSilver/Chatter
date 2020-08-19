import React from 'react'
import styles from './CustomerLayoutMobile.module.scss'

type PropsType = {
    header: React.ReactNode
    body: React.ReactNode
}

const CustomerLayoutMobile = (props: PropsType) => {
    return <div className={styles.layout}>
        <div className={styles.content}>
            <div>
                {props.header}
            </div>
            <div>
                {props.body}
            </div>
        </div>
    </div>
}

export default CustomerLayoutMobile
