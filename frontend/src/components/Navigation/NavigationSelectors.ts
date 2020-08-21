import {GlobalState} from '../../stores/globalStore'
import {Area} from '../../infrastructure/activities/areas'

export const actualAreas = (state: GlobalState): Area[] => state.navigation.areas
