import {Activity} from './Types'

const dialogActivity: Activity = {
    name: 'Диалоги',
    url: '/Dialogs'
}

const profileActivity: Activity = {
    name: 'Профиль',
    url: '/Profile'
}

const signInActivity: Activity = {
    name: 'Вход',
    url: '/SignIn'
}

const activities = {
    dialogs: dialogActivity,
    profile: profileActivity,
    signIn: signInActivity
}

export default activities
