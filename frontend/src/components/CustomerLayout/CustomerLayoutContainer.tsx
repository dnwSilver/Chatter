import React, {FC, PropsWithChildren} from 'react'
import CustomerLayoutDesktop from './Desktop/CustomerLayoutDesktop'
import CustomerLayoutMobile from './Mobile/CustomerLayoutMobile'
import PlatformConsumer from '../../contexts/platforms/PlatformConsumer'

const CustomerLayoutContainer: FC<PropsType> = ({header, children}): JSX.Element => {
    const desktopRender = <CustomerLayoutDesktop header={header}
                                                 body={children}/>

    const mobileRender = <CustomerLayoutMobile header={header}
                                               body={children}/>

    return <PlatformConsumer desktopVersion={desktopRender}
                             mobileVersion={mobileRender}/>
}

type OwnPropsType = {
    header: React.ReactNode
}

type PropsType = PropsWithChildren<OwnPropsType>

export default CustomerLayoutContainer
