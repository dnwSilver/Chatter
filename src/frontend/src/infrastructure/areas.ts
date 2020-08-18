import activities from './activities'
import {Area} from './Types'

const areas: Area[] = [
    {
        name: 'Публичная',
        pages: [
            activities.dialogs,
            activities.profile,
            activities.signIn
        ]
    }
]

export default areas
