import {GlobalState} from '../../stores/globalStore'

export const dialogMessages = (state: GlobalState): string[] => state.dialogs.messages
