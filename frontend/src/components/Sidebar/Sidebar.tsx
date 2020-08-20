import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Sidebar.module.scss'
import {Activity, Area} from '../../infrastructure/Types'

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
