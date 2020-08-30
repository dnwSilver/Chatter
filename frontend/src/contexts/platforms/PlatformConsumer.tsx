import React, {ReactNode} from 'react'
import PlatformContext from './PlatformContext'
import Platform from './Platform'

type Props = {
    desktopVersion: ReactNode
    mobileVersion: ReactNode
}

const PlatformConsumer = (props: Props) => {
    return <PlatformContext.Consumer>
        {
            value => {
                return <>
                    {
                        value === Platform.Desktop &&
                        props.desktopVersion
                    }
                    {
                        value === Platform.Mobile &&
                        props.mobileVersion
                    }
                </>
            }
        }
    </PlatformContext.Consumer>
}

export default PlatformConsumer
