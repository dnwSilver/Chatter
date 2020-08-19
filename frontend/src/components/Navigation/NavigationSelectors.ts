import {GlobalState} from '../../stores/GlobalStore'
import {Area} from '../../infrastructure/Types'

export const actualAreas = (state: GlobalState): Area[] => state.navigation.areas
