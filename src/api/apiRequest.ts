import apiConnection from './apiConnection.ts'
import {IApiRequest} from './interface.ts'

export default async function apiRequest<TResponse, TRequest = undefined>({
    url,
    method,
    data,
    bearerAuth,
    basicAuth,
}: IApiRequest<TRequest>): Promise<TResponse> {
    const headers = new Map<string, string>()

    if (bearerAuth) {
        headers.set('Authorization', 'Bearer ' + bearerAuth)
    }

    if (basicAuth && !bearerAuth) {
        headers.set('Authorization', 'Basic ' + btoa(`${basicAuth.user}:${basicAuth.pass}`))
    }

    if (data instanceof FormData) {
        headers.set('Content-Type', 'multipart/form-data')
    }

    if (data instanceof Object) {
        headers.set('Content-Type', 'application/json')
    }

    const options: RequestInit = {
        method: method,
        headers: {
            ...Object.fromEntries(headers),
        },
        body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : null,
    }

    return (await apiConnection(url, options)) as TResponse
}
