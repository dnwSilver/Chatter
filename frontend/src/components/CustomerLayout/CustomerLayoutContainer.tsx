import React, {FC, PropsWithChildren} from 'react'
import CustomerLayoutDesktop from './Desktop/CustomerLayoutDesktop'
import {connect} from 'react-redux'
import CustomerLayoutMobile from './Mobile/CustomerLayoutMobile'
import PlatformConsumer from '../../contexts/platforms/PlatformConsumer'

type OwnPropsType = {
    header: React.ReactNode
}

type PropsType = PropsWithChildren<OwnPropsType>

const CustomerLayoutContainer: FC<PropsType> = (props: PropsType) => {
    console.debug('Layout', 'RENDER')

    const desktopRender = <CustomerLayoutDesktop header={props.header}
                                                 body={props.children}/>

    const mobileRender = <CustomerLayoutMobile header={props.header}
                                               body={props.children}/>

    return <PlatformConsumer desktopVersion={desktopRender}
                             mobileVersion={mobileRender}/>
}


export default connect()(CustomerLayoutContainer)
