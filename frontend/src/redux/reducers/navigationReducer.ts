import {Action} from 'redux'
import areas, {Area} from '../../infrastructure/activities/areas'

const navigationReducer = (state: LocalState = initialState, action: Action): LocalState => {
    switch (action.type) {
        default:
            return state
    }
}

const initialState = {
    areas: areas as Area[]
}

type LocalState = typeof initialState

export default navigationReducer
