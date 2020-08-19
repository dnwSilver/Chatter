import {GlobalState} from '../../stores/GlobalStore'

export const dialogMessages = (state: GlobalState): string[] => state.dialogs.messages
