import React from 'react'
import Platform from './Platform'

export const ViewPlatformContext = React.createContext({platform: Platform.Desktop})

const PlatformViewer = ({children}: any) => {
    const [platform, setPlatform] = React.useState(Platform.Unknown)

    const handleWindowResize = () => {
        const platformBySize = window.innerWidth < 768 ? Platform.Mobile : Platform.Desktop
        if (platformBySize !== platform)
            setPlatform(platformBySize)
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [platform])

    return <ViewPlatformContext.Provider value={{platform}}>
        {children}
    </ViewPlatformContext.Provider>
}

export default PlatformViewer
