import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navigation.module.scss'
import Icon from '../Icon/Icon'
import {Activity} from '../../infrastructure/activities/activities'
import {Area} from '../../infrastructure/activities/areas'

const Navigation = ({areas}:Props) => {
    return <nav className={styles.navigation}>
        {
            areas.map((area: Area, groupIndex: number) =>
                <div className={styles.area}
                     key={groupIndex}>
                    {
                        area.activities.map((activity: Activity, activityIndex: number) =>
                            <NavLink className={styles.navLink}
                                     activeClassName={styles.active} key={activityIndex}
                                     to={activity.url}>
                                <Icon icon={activity.icon}/>
                            </NavLink>
                        )
                    }
                </div>
            )
        }
    </nav>
}

export type Props = {
    areas: Area[]
}

export default Navigation
