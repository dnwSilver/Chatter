import {SEND_MESSAGE_SUCCESS, SendMessageAction} from './DialogsTypes'
import {InferActionsTypes} from '../../infrastructure/Types'

export const actions = {
    onMessageSend: (newMessageBody: string): SendMessageAction => ({
        type: SEND_MESSAGE_SUCCESS,
        newMessageBody
    } as const)
}

export type ActionsType = InferActionsTypes<typeof actions>
