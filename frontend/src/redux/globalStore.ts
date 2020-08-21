import {combineReducers, createStore} from 'redux'
import dialogsReducer from './reducers/dialogsReducer'
import navigationReducer from './reducers/navigationReducer'
import profileReducer from './reducers/profileReducer'

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    navigation: navigationReducer
})

export type GlobalStore = ReturnType<typeof rootReducer>

const globalStore = createStore(rootReducer)

export default globalStore
