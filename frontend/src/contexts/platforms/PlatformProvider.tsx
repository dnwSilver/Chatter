import React from 'react'
import Platform from './Platform'
import PlatformContext from './PlatformContext'

type PropsType = {}
type StateType = { platform: Platform }

class PlatformProvider extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {platform: Platform.Unknown}
        if (this.state.platform === Platform.Unknown)
            this.handleWindowResize()
    }

    handleWindowResize = () => {
        const platformBySize = window.innerWidth < 768 ? Platform.Mobile : Platform.Desktop

        if (platformBySize !== this.state.platform)
            this.setState({platform: platformBySize})
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize)
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleWindowResize)
    }

    render() {
        return <PlatformContext.Provider value={this.state.platform}>
            {this.props.children}
        </PlatformContext.Provider>
    }
}

export default PlatformProvider
