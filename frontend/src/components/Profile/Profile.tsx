import React, {FC}             from 'react'
import activities              from '../../infrastructure/activities/activities'
import CustomerLayoutContainer from '../CustomerLayout/CustomerLayoutContainer'
import Header                  from '../Header/Header'
import Panel                   from '../Panel/Panel'

const Profile: FC=()=>{
  const renderHeader=<Header title={activities.profile.name}/>
  return <CustomerLayoutContainer header={renderHeader}>
    <Panel title={'Информация по профилю'}
           content={'Очень полезная информация'}/>
  </CustomerLayoutContainer>
}

export default Profile
