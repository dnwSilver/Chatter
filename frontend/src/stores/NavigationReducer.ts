import {Action} from 'redux'
import areas from '../infrastructure/areas'

const initialState = {
    areas: areas
}

const navigationReducer = (state: StatePropsType = initialState, action: Action): StatePropsType => {
    switch (action.type) {
        default:
            return state
    }
}

export type StatePropsType = typeof initialState

export default navigationReducer
