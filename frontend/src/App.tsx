import React, {Component}             from 'react'
import {Provider}                     from 'react-redux'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import DialogsContainer               from './components/Dialogs/DialogsContainer'
import Profile                        from './components/Profile/Profile'
import PlatformProvider               from './contexts/platforms/PlatformProvider'
import activities                     from './infrastructure/activities/activities'
import globalStore                    from './redux/globalStore'

class App extends Component<DispatchProps> {
  catchAllUnhandledErrors=(e: PromiseRejectionEvent)=>{
    alert('Some error occured')
  }

  componentDidMount() {
    //this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    // if (!this.props.initialized) {
    //     return <div>Preloader</div>
    // }
    console.debug('ContainerApp', 'RENDER')

    return <Routes>
      <Route path={'/'} element={<Profile/>}/>
      <Route path={activities.signIn.url} element={<DialogsContainer/>}/>
      <Route path={activities.profile.url} element={<Profile/>}/>
      <Route path={activities.dialogs.url} element={<DialogsContainer/>}/>
    </Routes>
  }
}

type DispatchProps={
  // initializeApp: () => void
}

type Props=DispatchProps

const PatternApp: React.FC<Props>=()=>{
  console.debug('PatternApp', 'RENDER')
  return <BrowserRouter>
    <Provider store={globalStore}>
      <PlatformProvider>
        <App/>
      </PlatformProvider>
    </Provider>
  </BrowserRouter>
}

export default PatternApp
