import React from 'react'
import Header from '../Header/Header'
import Panel from '../Panel/Panel'
import activities from '../../infrastructure/activities'
import CustomerLayoutContainer from '../CustomerLayout/CustomerLayoutContainer'

const Profile = () => {
    const renderHeader = <Header title={activities.profile.name}/>

    const renderBody = <Panel title={'Информация по профилю'}
                              content={'Очень полезная информация'}/>

    return <CustomerLayoutContainer header={renderHeader}
                                    body={renderBody}/>
}

export default Profile
