import React from 'react'
import {ViewPlatformContext} from './PlatformViewer'

const usePlatform = () => {
    const {platform} = React.useContext(ViewPlatformContext)
    return platform
}

export default usePlatform
