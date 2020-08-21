import icon, {IconType} from '../../resources/icon'

export type Activity = {
    name: string
    url: string
    icon: IconType
}

const dialogActivity: Activity = {
    name: 'Диалоги',
    url: '/Dialogs',
    icon: icon.chat
}

const profileActivity: Activity = {
    name: 'Профиль',
    url: '/Profile',
    icon: icon.profile
}

const signInActivity: Activity = {
    name: 'Вход',
    url: '/SignIn',
    icon: icon.sign
}

const activities = {
    dialogs: dialogActivity,
    profile: profileActivity,
    signIn: signInActivity
}

export default activities
