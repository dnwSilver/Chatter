import React from 'react'
import CustomerLayout from '../Layout/Customer/CustomerLayout'
import Header from '../Header/Header'
import Panel from '../Panel/Panel'
import activities from '../../infrastructure/activities'

const Profile = () => {
    return <CustomerLayout header={<Header title={activities.profile.name}/>}
                           body={<Panel title={'Информация по профилю'}
                                        content={'Очень полезная информация'}/>}
    />
}

export default Profile
