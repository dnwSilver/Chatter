import React, {PropsWithChildren, ReactNode} from 'react'
import PlatformConsumer                      from '../../contexts/platforms/PlatformConsumer'
import CustomerLayoutDesktop                 from './Desktop/CustomerLayoutDesktop'
import CustomerLayoutMobile                  from './Mobile/CustomerLayoutMobile'

const CustomerLayoutContainer=({header, children}: Props)=>{
  const desktopRender=<CustomerLayoutDesktop header={header}
                                             body={children}/>

  const mobileRender=<CustomerLayoutMobile header={header}
                                           body={children}/>

  return <PlatformConsumer desktopVersion={desktopRender}
                           mobileVersion={mobileRender}/>
}

type OwnProps={
  header: ReactNode
}

type Props=PropsWithChildren<OwnProps>

export default CustomerLayoutContainer
