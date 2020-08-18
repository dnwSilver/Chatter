import {GlobalState} from '../../stores/redux-store'

export const dialogMessages = (state: GlobalState): string[] => state.dialogs.messages
