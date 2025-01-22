import {useUserStore} from '../../../store/useUserStore.ts'
import {useQueryClient} from '@tanstack/react-query'
import {useEffect} from 'react'
import {useGetUserDetails} from '../hooks/useGetUserDetails.ts'

export default function UserLoader() {
    const {
        userStore: {id, token},
        logout,
        setUser,
        setError,
        setIsLoading,
    } = useUserStore()

    const queryClient = useQueryClient()

    const {data, isLoading, isError, error} = useGetUserDetails(id, token)

    useEffect(() => {
        setIsLoading(isLoading)

        if (data) {
            setUser(data.user)
        }

        if (isError) {
            logout(queryClient)
            setError(error)
        }
    }, [data, isError, isLoading])

    return null
}
