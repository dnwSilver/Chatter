import Actions, {SEND_MESSAGE_SUCCESS} from '../actions/dialogsActions'

const dialogsReducer = (state: LocalState = initialState, action: Actions): LocalState => {
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

const initialState = {
    messages: [] as string[]
}

type LocalState = typeof initialState

export default dialogsReducer

