import React from 'react'
import styles from './CustomerLayoutMobile.module.scss'
import Navigation from '../../Navigation/NavigationContainer'

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
        <div className={styles.navigation}>
            <Navigation/>
        </div>
    </div>
}

export default CustomerLayoutMobile
