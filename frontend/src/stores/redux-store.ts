import {combineReducers, createStore} from 'redux'
import profileReducer from '../components/Profile/ProfileReducer'
import dialogsReducer from '../components/Dialogs/DialogsReducer'
import sidebarReducer from '../components/Sidebar/SidebarReducer'
import platformReducer from '../contexts/platforms/PlatformReducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    sidebar: sidebarReducer,
    platform: platformReducer
})

type rootReducerType = typeof rootReducer

export type GlobalState = ReturnType<rootReducerType>

const globalStore = createStore(rootReducer)

export default globalStore
