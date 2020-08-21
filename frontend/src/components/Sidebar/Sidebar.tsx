import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Sidebar.module.scss'
import {Activity} from '../../infrastructure/activities/activities'
import {Area} from '../../infrastructure/activities/areas'
import Icon from '../Icon/Icon'

export type PropsType = {
    areas: Area[]
}

const Sidebar = (props: PropsType) => {
    console.debug('Sidebar', 'RENDER')

    return <nav className={styles.navigation}>
        {
            props.areas.map((area: Area, areaIndex: number) =>
                <div key={areaIndex}>
                    <div className={styles.area}
                         children={area.name}/>
                    {
                        area.activities.map((activity: Activity, activityIndex: number) =>
                            <NavLink className={styles.navLink}
                                     activeClassName={styles.active}
                                     key={activityIndex}
                                     to={activity.url}>
                                <Icon icon={activity.icon}/>
                                <span className={styles.text}
                                      children={activity.name}/>
                            </NavLink>
                        )
                    }
                </div>
            )
        }
    </nav>
}

export default Sidebar
