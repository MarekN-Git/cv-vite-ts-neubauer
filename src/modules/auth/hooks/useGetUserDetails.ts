import apiRequest from '../../../api/apiRequest.ts'
import {ApiEndPoints} from '../../../api/apiEndPoints.ts'
import {useQuery} from '@tanstack/react-query'
import {getApiError} from '../../../api/apiErrorHandler.ts'
import {IUser} from '../utils/interface.ts'

export function useGetUserDetails(id: number | undefined, token: string | undefined) {
    const getUser = async () => {
        return await apiRequest<IUser>({
            url: ApiEndPoints.getUserDetails.url({userId: id}),
            method: ApiEndPoints.getUserDetails.method,
            bearerAuth: token,
        })
    }

    const {data, isLoading, error, isError} = useQuery<IUser, Error>({
        queryKey: [ApiEndPoints.getUserDetails.query, id],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        data,
        isLoading,
        error: getApiError(error).message,
        isError,
    }
}
