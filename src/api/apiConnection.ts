import getConfig from '../utils/getConfig.ts'
import {apiErrorHandler} from './apiErrorHandler.ts'

export default async function (url: string, requestOptions: RequestInit) {
    const response = await fetch(getConfig().API_URL + url, requestOptions)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            apiErrorHandler({
                status: response.status,
                body: data,
            }),
        )
    }

    return data
}
