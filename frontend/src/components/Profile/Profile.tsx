import React from 'react'
import Header from '../Header/Header'
import Panel from '../Panel/Panel'
import activities from '../../infrastructure/activities/activities'
import CustomerLayoutContainer from '../CustomerLayout/CustomerLayoutContainer'

const Profile = () => {
    const renderHeader = <Header title={activities.profile.name}/>

    console.debug('Profile', 'RENDER')
    return <CustomerLayoutContainer header={renderHeader}>
        <Panel title={'Информация по профилю'}
               content={'Очень полезная информация'}/>
    </CustomerLayoutContainer>
}

export default Profile
