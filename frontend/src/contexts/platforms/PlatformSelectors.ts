import {GlobalState} from '../../stores/redux-store'
import Platform from './Platform'

export const currentPlatform = (state: GlobalState): Platform => state.platform.current
