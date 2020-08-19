import React, {FC} from 'react'
import CustomerLayoutDesktop from './Desktop/CustomerLayoutDesktop'
import {connect} from 'react-redux'
import CustomerLayoutMobile from './Mobile/CustomerLayoutMobile'
import PlatformConsumer from '../../contexts/platforms/PlatformConsumer'

type OwnPropsType = {
    header: React.ReactNode
    body: React.ReactNode
}

type PropsType = OwnPropsType

const CustomerLayoutContainer: FC<PropsType> = (props: PropsType) => {

    const desktopRender = <CustomerLayoutDesktop header={props.body}
                                                 body={props.body}/>

    const mobileRender = <CustomerLayoutMobile header={props.body}
                                               body={props.body}/>

    return <PlatformConsumer desktopVersion={desktopRender}
                             mobileVersion={mobileRender}/>
}


export default connect()(CustomerLayoutContainer)
