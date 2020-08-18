import {GlobalState} from '../../stores/redux-store'
import {Area} from '../../infrastructure/Types'

export const actualAreas = (state: GlobalState): Area[] => state.sidebar.areas
