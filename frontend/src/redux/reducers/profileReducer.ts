import {AnyAction} from 'redux'
import activities, {Activity} from '../../infrastructure/activities/activities'

const profileReducer = (state: LocalState = initialState, action: AnyAction): LocalState => {
    switch (action.type) {
        default:
            return state
    }
}

const initialState = {
    newMessageText: undefined as string | undefined,
    sidebarItems: [
        {
            name: 'Меню' as string,
            activities: [
                activities.profile,
                activities.dialogs
            ] as Activity[]
        }
    ]
}

type LocalState = typeof initialState

export default profileReducer
