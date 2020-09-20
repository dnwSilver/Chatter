import React, {ReactNode} from 'react'
import Navigation         from '../../Navigation/NavigationContainer'
import styles             from './CustomerLayoutMobile.module.scss'

const CustomerLayoutMobile=({header, body}: Props)=>{
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

type Props={
  header: ReactNode
  body: ReactNode
}

export default CustomerLayoutMobile
