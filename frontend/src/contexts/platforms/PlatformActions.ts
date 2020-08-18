import {InferActionsTypes} from '../../infrastructure/Types'
import {CHANGE_PLATFORM_SUCCESS, ChangePlatformAction} from './PlatformTypes'
import Platform from './Platform'

export const actions = {
    onPlatformChange: (platform: Platform): ChangePlatformAction => ({
        type: CHANGE_PLATFORM_SUCCESS,
        platform: platform
    } as const)
}

export type ActionsType = InferActionsTypes<typeof actions>
