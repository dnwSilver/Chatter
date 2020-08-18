import {ActionsType} from './PlatformActions'
import {CHANGE_PLATFORM_SUCCESS} from './PlatformTypes'
import Platform from './Platform'

const initialState = {
    current: Platform.Unknown as Platform
}

type LocalState = typeof initialState

const platformReducer = (state: LocalState = initialState, action: ActionsType): LocalState => {
    switch (action.type) {
        case CHANGE_PLATFORM_SUCCESS:
            return {
                ...state,
                current: action.platform
            }
        default:
            return state
    }
}

export default platformReducer

