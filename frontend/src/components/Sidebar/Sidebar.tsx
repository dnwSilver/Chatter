import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Sidebar.module.scss'
import {Activity} from '../../infrastructure/activities/activities'
import {Area} from '../../infrastructure/activities/areas'
import Icon from '../Icon/Icon'

const Sidebar: FC<Props> = ({areas}): JSX.Element => {
    return <nav className={styles.navigation}>
        {
            areas.map((area: Area, areaIndex: number) =>
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

type Props = {
    areas: Area[]
}

export default Sidebar
