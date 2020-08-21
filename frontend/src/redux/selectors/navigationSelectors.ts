import {GlobalStore} from '../globalStore'
import {Area} from '../../infrastructure/activities/areas'

export const actualAreas = (state: GlobalStore): Area[] => state.navigation.areas
