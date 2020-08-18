import {Action} from 'redux'
import {project} from '../../infrastructure/Types'
import Platform from './Platform'

const component = 'PLATFORM'
const actionPrefix = `${project}/${component}`

export const CHANGE_PLATFORM_SUCCESS = `${actionPrefix}/CHANGE_PLATFORM_SUCCESS`

export type ChangePlatformAction = Action<typeof CHANGE_PLATFORM_SUCCESS> & {
    platform: Platform
}
