import React           from 'react'
import Platform        from './Platform'
import PlatformContext from './PlatformContext'

type Props={}
type LocalState={ platform: Platform }

class PlatformProvider extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props)
    this.state={platform: Platform.Unknown}
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    if(this.state.platform===Platform.Unknown)
      this.handleWindowResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  render() {
    return <PlatformContext.Provider value={this.state.platform}>
      {this.props.children}
    </PlatformContext.Provider>
  }

  handleWindowResize=()=>{
    const platformBySize=window.innerWidth<768 ? Platform.Mobile : Platform.Desktop

    if(platformBySize!==this.state.platform)
      this.setState({platform: platformBySize})
  }

}

export default PlatformProvider
