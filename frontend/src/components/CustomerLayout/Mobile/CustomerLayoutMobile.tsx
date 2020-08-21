import React, {FC} from 'react'
import styles from './CustomerLayoutMobile.module.scss'
import Navigation from '../../Navigation/NavigationContainer'

const CustomerLayoutMobile: FC<Props> = ({header, body}): JSX.Element => {
    return <div className={styles.layout}>
        <div className={styles.content}>
            <div>
                {header}
            </div>
            <div>
                {body}
            </div>
        </div>
        <div className={styles.navigation}>
            <Navigation/>
        </div>
    </div>
}

type Props = {
    header: React.ReactNode
    body: React.ReactNode
}

export default CustomerLayoutMobile
