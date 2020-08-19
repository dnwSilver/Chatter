import {IconType} from './IconTypes'

export const project = 'CHATTER'

export type Activity = {
    name: string
    url: string
    icon: IconType
}

export type Area = {
    name: string
    pages: Activity[]
}

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
