import {Activity} from './Types'
import {IconType} from './IconTypes'

const dialogActivity: Activity = {
    name: 'Диалоги',
    url: '/Dialogs',
    icon: IconType.Dialogs
}

const profileActivity: Activity = {
    name: 'Профиль',
    url: '/Profile',
    icon: IconType.Profile
}

const signInActivity: Activity = {
    name: 'Вход',
    url: '/SignIn',
    icon: IconType.SignIn
}

const activities = {
    dialogs: dialogActivity,
    profile: profileActivity,
    signIn: signInActivity
}

export default activities
