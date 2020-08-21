import React, {ReactNode} from 'react'
import PlatformContext from './PlatformContext'
import Platform from './Platform'

type PropsType = {
    desktopVersion: ReactNode
    mobileVersion: ReactNode
}

const PlatformConsumer: React.FC<PropsType> = (props: PropsType) => {
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
