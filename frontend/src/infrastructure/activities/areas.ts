import activities, {Activity} from './activities'

export type Area={
  name: string
  activities: Activity[]
}

const areas: Area[]=[
  {
    name: 'Публичная',
    activities: [
      activities.dialogs,
      activities.profile,
      activities.signIn
    ]
  }
]

export default areas
