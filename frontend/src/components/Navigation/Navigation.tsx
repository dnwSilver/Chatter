import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Navigation.module.scss'
import {Activity, Area} from '../../infrastructure/Types'
import Icon from '../Icon/Icon'

export type PropsType = {
    areas: Area[]
}

const Navigation = (props: PropsType) => {
    return <nav className={styles.navigation}>
        {
            props.areas.map((area: Area, groupIndex: number) =>
                <div key={groupIndex}
                     className={styles.area}>
                    {
                        area.activities.map((activity: Activity, activityIndex: number) =>
                            <NavLink key={activityIndex}
                                     to={activity.url}
                                     className={styles.navLink}
                                     activeClassName={styles.active}>
                                <div className={styles.link}>
                                    <Icon type={activity.icon}/>
                                </div>
                            </NavLink>
                        )
                    }
                </div>
            )
        }
    </nav>
}

export default Navigation