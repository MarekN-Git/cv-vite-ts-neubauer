import {TRequestMethod} from './interface.ts'

interface IApiEndPoints {
    userLogin: {
        url: string
        method: TRequestMethod
    }
    getUserDetails: {
        url: (props: {userId: number | undefined}) => string
        query: string
        method: TRequestMethod
    }
    getCars: {
        url: string
        query: string
        method: TRequestMethod
    }
    carRemove: {
        url: (props: {carId: number}) => string
        query: string
        method: TRequestMethod
    }
    carCreateAndUpdate: {
        url: string
        query: string
        method: TRequestMethod
    }
}

export const ApiEndPoints: IApiEndPoints = {
    userLogin: {
        url: 'user/login',
        method: 'GET',
    },
    getUserDetails: {
        url: ({userId}) => `user/details/${userId}`,
        query: 'userDetails',
        method: 'GET',
    },
    getCars: {
        url: 'car/cars',
        query: 'cars',
        method: 'GET',
    },
    carCreateAndUpdate: {
        url: 'car/create',
        query: 'cars',
        method: 'POST',
    },
    carRemove: {
        url: ({carId}) => `car/remove/${carId}`,
        query: 'cars',
        method: 'GET',
    },
}
