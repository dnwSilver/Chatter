import React, {ReactNode} from 'react'
import styles from './CustomerLayoutDesktop.module.scss'
import SidebarContainer from '../../Sidebar/SidebarContainer'

const CustomerLayoutDesktop = ({header, body}: Props) => {
    return <div className={styles.layout}>
        <div className={styles.navigation}>
            <SidebarContainer/>
        </div>
        <div className={styles.content}>
            <div>
                {header}
            </div>
            <div>
                {body}
            </div>
        </div>
    </div>
}

type Props = {
    header: ReactNode
    body: ReactNode
}

export default CustomerLayoutDesktop
