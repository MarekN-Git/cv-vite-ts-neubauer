import {UseMutateFunction, useMutation, useQueryClient} from '@tanstack/react-query'
import {ICarDetails} from '../../../public/CarsTable/utils/interface.ts'
import apiRequest from '../../../../api/apiRequest.ts'
import {ApiEndPoints} from '../../../../api/apiEndPoints.ts'
import {getApiError} from '../../../../api/apiErrorHandler.ts'

type TResponse = {
    message: string
}

export function useMutateCreateCar(token: string | undefined): {
    mutateAsync: UseMutateFunction<TResponse, Error, ICarDetails, unknown>
    isError: false | true
    data: undefined | string
    error: string | undefined
    isPending: false | true
    isSuccess: boolean
    reset: () => void
} {
    const queryClient = useQueryClient()

    const createCar = async (data: ICarDetails) => {
        return await apiRequest<TResponse, ICarDetails>({
            url: ApiEndPoints.carCreateAndUpdate.url,
            method: ApiEndPoints.carCreateAndUpdate.method,
            bearerAuth: token,
            data: data,
        })
    }

    const {mutateAsync, data, error, isPending, isError, isSuccess, reset} = useMutation({
        mutationFn: createCar,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [ApiEndPoints.carCreateAndUpdate.query]})
        },
    })

    return {
        mutateAsync,
        data: data?.message,
        error: getApiError(error).message,
        isPending,
        isError,
        isSuccess,
        reset,
    }
}
