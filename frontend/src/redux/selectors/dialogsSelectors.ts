import {GlobalStore} from '../globalStore'

export const dialogMessages = (state: GlobalStore): string[] => state.dialogs.messages
