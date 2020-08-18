import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Sidebar.module.scss'
import {Activity, Area} from '../../infrastructure/Types'

export type PropsType = {
    areas: Area[]
}

const Sidebar = (props: PropsType) => {
    return <nav className={styles.navigation}>
        {
            props.areas.map((group: Area, groupIndex: number) =>
                <div key={groupIndex}>
                    <div className={styles.group}
                         children={group.name}/>
                    {
                        group.pages.map((activity: Activity, activityIndex: number) =>
                            <NavLink key={activityIndex}
                                     to={activity.url}
                                     className={styles.navLink}
                                     activeClassName={styles.active}>
                                <div className={styles.link}
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
