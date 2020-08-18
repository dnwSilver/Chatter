import areas from '../../infrastructure/areas'
import {Action} from 'redux'

const initialSidebarState = {
    areas: areas
}

const sidebarReducer = (state: StatePropsType = initialSidebarState, action: Action): StatePropsType => {
    switch (action.type) {
        default:
            return state
    }
}

export type StatePropsType = typeof initialSidebarState
export default sidebarReducer
