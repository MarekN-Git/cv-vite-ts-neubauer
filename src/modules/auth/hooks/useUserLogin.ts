import {UseMutateFunction, useMutation} from '@tanstack/react-query'
import apiRequest from '../../../api/apiRequest.ts'
import {ApiEndPoints} from '../../../api/apiEndPoints.ts'
import {getApiError} from '../../../api/apiErrorHandler.ts'
import {ILoginResponse, IUserLoginInput} from '../utils/interface.ts'

export function useUserLogin(): {
    mutate: UseMutateFunction<ILoginResponse, Error, IUserLoginInput, unknown>
    isError: boolean
    isPending: boolean
    error: string
} {
    const userLogin = async (data: IUserLoginInput) => {
        return await apiRequest<ILoginResponse, IUserLoginInput>({
            url: ApiEndPoints.userLogin.url,
            method: ApiEndPoints.userLogin.method,
            basicAuth: {user: data.email, pass: data.password},
        })
    }

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: userLogin,
    })

    return {
        mutate,
        isPending,
        isError,
        error: getApiError(error).message,
    }
}
