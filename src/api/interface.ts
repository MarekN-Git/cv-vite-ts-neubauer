interface IApiError {
    status: number
    message: string
}

interface IResponseError {
    status: number
    body: object
}

interface IResponseErrorBody {
    error: string
}

type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'DELETE' | 'PATCH'

interface IApiRequest<T> {
    url: string
    method: TRequestMethod
    data?: T
    basicAuth?: {user: string; pass: string}
    bearerAuth?: string
}

export type {IApiError, IApiRequest, TRequestMethod, IResponseError, IResponseErrorBody}
