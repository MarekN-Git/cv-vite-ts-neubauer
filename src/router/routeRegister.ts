import {UserRoles} from '../utils/enums.ts'

interface IAppRouteOption {
    name: string
    url: string
    role?: string[]
}

export type TAppRouteKeys = 'Landing' | 'CarsTable' | 'NoMatch' | 'CarsManager' | 'Overview'

type TAppRoutes = {
    [name in TAppRouteKeys]: IAppRouteOption
}

export const appRoutes: TAppRoutes = {
    Landing: {name: 'Home', url: '/'},
    CarsTable: {name: 'CarsTable', url: '/cars-table'},
    NoMatch: {name: 'NoMatch', url: '*'},

    Overview: {name: 'Overview', url: '/profile/overview', role: [UserRoles.user, UserRoles.admin]},
    CarsManager: {name: 'CarsManager', url: '/profile/cars-manager', role: [UserRoles.admin]},
}
