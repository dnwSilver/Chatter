import {Action} from 'redux'
import {project} from '../../infrastructure/Types'

const component = 'DIALOGS'
const actionPrefix = `${project}/${component}`

export const SEND_MESSAGE_SUCCESS = `${actionPrefix}/SEND_MESSAGE_SUCCESS`

export type SendMessageAction = Action<typeof SEND_MESSAGE_SUCCESS> & {
    newMessageBody: string
}
