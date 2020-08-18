import {SEND_MESSAGE_SUCCESS} from './DialogsTypes'
import {ActionsType} from './DialogsActions'

const initialState = {
    messages: [] as string[],
}

type LocalState = typeof initialState

const dialogsReducer = (state: LocalState = initialState, action: ActionsType): LocalState => {
    switch (action.type) {
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, action.newMessageBody]
            }
        default:
            return state
    }
}

export default dialogsReducer

