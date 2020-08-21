import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navigation.module.scss'
import Icon from '../Icon/Icon'
import {Activity} from '../../infrastructure/activities/activities'
import {Area} from '../../infrastructure/activities/areas'

export type PropsType = {
    areas: Area[]
}

const Navigation = (props: PropsType) => {
    return <nav className={styles.navigation}>
        {
            props.areas.map((area: Area, groupIndex: number) =>
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

export default Navigation
