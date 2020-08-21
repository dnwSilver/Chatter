import React, {FC} from 'react'
import styles from './CustomerLayoutDesktop.module.scss'
import SidebarContainer from '../../Sidebar/SidebarContainer'

const CustomerLayoutDesktop: FC<PropsType> = ({header, body}): JSX.Element => {
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

type PropsType = {
    header: React.ReactNode
    body: React.ReactNode
}

export default CustomerLayoutDesktop
