import apiRequest from '../../../../api/apiRequest.ts'
import {ApiEndPoints} from '../../../../api/apiEndPoints.ts'
import {useQuery} from '@tanstack/react-query'
import {getApiError} from '../../../../api/apiErrorHandler.ts'
import {ICars} from '../utils/interface.ts'

export function useGetCars() {
    const getCars = async () => {
        return await apiRequest<ICars>({
            url: ApiEndPoints.getCars.url,
            method: ApiEndPoints.getCars.method,
        })
    }

    const {data, isLoading, error, isError} = useQuery<ICars, Error>({
        queryKey: [ApiEndPoints.getCars.query],
        queryFn: getCars,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        isLoading,
        error: getApiError(error).message,
        isError,
    }
}
