import {GlobalState} from '../../stores/globalStore'
import Platform from './Platform'

export const currentPlatform = (state: GlobalState): Platform => state.platform.current
