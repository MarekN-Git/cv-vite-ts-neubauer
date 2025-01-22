import {IApiError, IResponseError, IResponseErrorBody} from './interface.ts'

const apiError: string = 'ApiError: '

export function apiErrorHandler(error: IResponseError): string {
    return apiError + JSON.stringify(error)
}

export function getApiError(error: Error | null): IApiError {
    if (error?.message.startsWith(apiError)) {
        const errorResponse = JSON.parse(error.message.replace(apiError, '')) as IResponseError
        return {
            status: errorResponse.status,
            message: (errorResponse.body as IResponseErrorBody).error,
        }
    }

    return {status: 500, message: error?.message || 'Something went wrong!'}
}
