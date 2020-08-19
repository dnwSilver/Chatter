import React, {PropsWithChildren} from 'react'
import Platform from './Platform'
import {connect} from 'react-redux'
import {GlobalState} from '../../stores/GlobalStore'
import {currentPlatform} from './PlatformSelectors'
import {actions} from './PlatformActions'

export const PlatformContext = React.createContext(Platform.Unknown)

type StatePropsType = {
    platform: Platform
}

type DispatchPropsType = {
    onPlatformChange: (platform: Platform) => void
}

type PropsType = PropsWithChildren<StatePropsType & DispatchPropsType>

class PlatformProvider extends React.Component<PropsType> {

    constructor(props: PropsType) {
        super(props)
        if (this.props.platform === Platform.Unknown)
            this.handleWindowResize()
    }

    handleWindowResize = () => {
        const platformBySize = window.innerWidth < 768 ? Platform.Mobile : Platform.Desktop

        if (platformBySize !== this.props.platform)
            this.props.onPlatformChange(platformBySize)
    }

    componentDidMount() {

        window.addEventListener('resize', this.handleWindowResize)
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleWindowResize)
    }

    render() {
        return <PlatformContext.Provider value={this.props.platform}>
            {this.props.children}
        </PlatformContext.Provider>
    }
}


const mapStateToProps = (state: GlobalState): StatePropsType => ({
    platform: currentPlatform(state)
})

export default connect<StatePropsType, DispatchPropsType, {}, GlobalState>(mapStateToProps, {...actions})(PlatformProvider)
