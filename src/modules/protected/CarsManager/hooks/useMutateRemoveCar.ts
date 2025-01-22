import {UseMutateFunction, useMutation, useQueryClient} from '@tanstack/react-query'
import apiRequest from '../../../../api/apiRequest.ts'
import {ApiEndPoints} from '../../../../api/apiEndPoints.ts'
import {getApiError} from '../../../../api/apiErrorHandler.ts'

type TResponse = {
    message: string
}

export function useMutateRemoveCar(token: string | undefined): {
    mutateAsync: UseMutateFunction<TResponse, Error, number, unknown>
    isError: false | true
    error: string | undefined
    isPending: false | true
} {
    const queryClient = useQueryClient()

    const removeCar = async (id: number) => {
        return await apiRequest<TResponse>({
            url: ApiEndPoints.carRemove.url({carId: id}),
            method: ApiEndPoints.carRemove.method,
            bearerAuth: token,
        })
    }

    const {mutateAsync, error, isPending, isError} = useMutation({
        mutationFn: removeCar,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [ApiEndPoints.carRemove.query]})
        },
    })

    return {
        mutateAsync,
        error: getApiError(error).message,
        isPending,
        isError,
    }
}
