import {Action}     from 'redux'
import InferActions from './InferActions'

const actionPrefix: string='DIALOGS'

export const SEND_MESSAGE_SUCCESS: string=`${actionPrefix}/SEND_MESSAGE_SUCCESS`

export type SendMessageAction=Action<typeof SEND_MESSAGE_SUCCESS> & {
  newMessageBody: string
}

export const actions={
  onMessageSend: (newMessageBody: string): SendMessageAction=>({
    type: SEND_MESSAGE_SUCCESS,
    newMessageBody
  } as const)
}

type Actions=InferActions<typeof actions>

export default Actions
