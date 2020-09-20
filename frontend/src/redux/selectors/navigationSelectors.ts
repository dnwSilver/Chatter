import {Area}        from '../../infrastructure/activities/areas'
import {GlobalStore} from '../globalStore'

export const actualAreas=(state: GlobalStore): Area[]=>state.navigation.areas
