import {combineReducers, createStore} from 'redux'
import profileReducer from '../components/Profile/ProfileReducer'
import dialogsReducer from '../components/Dialogs/DialogsReducer'
import navigationReducer from './NavigationReducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    navigation: navigationReducer
})

type rootReducerType = typeof rootReducer

export type GlobalState = ReturnType<rootReducerType>

const globalStore = createStore(rootReducer)

export default globalStore
