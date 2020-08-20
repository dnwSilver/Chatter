import {AnyAction} from 'redux'
import activities from '../../infrastructure/activities'
import {Area} from '../../infrastructure/Types'

const initialProfileState: StatePropsType = {
    newPostText: undefined,
    sidebarItems: [
        {
            name: 'Меню',
            activities: [
                activities.profile,
                activities.dialogs
            ]
        }
    ]
}

export type StatePropsType = {
    newPostText: string | undefined
    sidebarItems: Area[]
}

const profileReducer = (state: StatePropsType = initialProfileState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state
    }
}

export default profileReducer
