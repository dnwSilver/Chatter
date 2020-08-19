import {GlobalState} from '../../stores/GlobalStore'
import Platform from './Platform'

export const currentPlatform = (state: GlobalState): Platform => state.platform.current
