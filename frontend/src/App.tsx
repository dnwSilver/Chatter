import React, {Component} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Profile from './components/Profile/Profile'
import activities from './infrastructure/activities'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import globalStore, {GlobalState} from './stores/redux-store'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import PlatformViewer from './contexts/platforms/PlatformViewer'

class App extends Component<StatePropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    // initializeApp: () => void
}

type PropsType = StatePropsType & DispatchPropsType

const mapStateToProps = (state: GlobalState) => ({})

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {}))(App)


const PatternApp: React.FC<PropsType> = () => {
    console.debug('PatternApp', 'RENDER')
    return <BrowserRouter>
        <Provider store={globalStore}>
            <PlatformViewer>
                <AppContainer/>
            </PlatformViewer>
        </Provider>
    </BrowserRouter>
}

export default PatternApp

// @ts-ignore
window.store = globalStore.getState()
