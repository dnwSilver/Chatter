import React from 'react'
import styles from './CustomerLayout.module.scss'
import SidebarContainer from '../../Sidebar/SidebarContainer'

type PropsType = {
    header: React.ReactNode
    body: React.ReactNode
}

const CustomerLayout = (props: PropsType) => {
    return <div className={styles.layout}>
        <div className={styles.navigation}>
            <SidebarContainer />
        </div>
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

export default CustomerLayout
