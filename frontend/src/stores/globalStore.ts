import {combineReducers, createStore} from 'redux'
import profileReducer from '../components/Profile/ProfileReducer'
import dialogsReducer from '../components/Dialogs/DialogsReducer'
import platformReducer from '../contexts/platforms/PlatformReducer'
import navigationReducer from './NavigationReducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    navigation: navigationReducer,
    platform: platformReducer
})

type rootReducerType = typeof rootReducer

export type GlobalState = ReturnType<rootReducerType>

const globalStore = createStore(rootReducer)

export default globalStore
