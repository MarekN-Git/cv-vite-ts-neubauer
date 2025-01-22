import {create} from 'zustand'
import {getUserTokenFromLS, removeUserTokenFromLS, setUserTokenToLS} from '../utils/localStorage.ts'
import {QueryClient} from '@tanstack/react-query'
import {ApiEndPoints} from '../api/apiEndPoints.ts'
import {getUserJwtDetailsFromToken} from '../modules/auth/utils/authUtils.ts'
import {IUserDetails} from '../modules/auth/utils/interface.ts'

interface IUserStore {
    isLogged?: boolean
    id?: number
    token?: string
    user?: IUserDetails
    error?: string
    isLoading?: boolean
}

interface Store {
    userStore: IUserStore
    login: (token: string) => void
    logout: (queryClient: QueryClient) => void
    setUser: (user: IUserDetails) => void
    setError: (e: string | undefined) => void
    setIsLoading: (v: boolean) => void
}

const token = getUserTokenFromLS()

export const useUserStore = create<Store>((set) => ({
    userStore: {
        isLogged: false,
        id: getUserJwtDetailsFromToken(token || '')?.id,
        user: undefined,
        token: token,
        error: undefined,
    },
    login: (token) => {
        const jwtDetails = getUserJwtDetailsFromToken(token)
        /** If expiration > validate expiration. */

        if (jwtDetails) {
            set((state) => ({
                userStore: {
                    ...state.userStore,
                    isLogged: true,
                    id: jwtDetails.id,
                    token: token,
                },
            }))
            setUserTokenToLS(token)
        } else {
            removeUserTokenFromLS()
            set({userStore: {error: 'Invalid JWT token format!'}})
        }
    },
    setUser: (user) => {
        set((state) => ({
            userStore: {...state.userStore, user: user, isLogged: true, error: undefined},
        }))
    },
    logout: (queryClient) => {
        queryClient.removeQueries({queryKey: [ApiEndPoints.getUserDetails.query]})
        removeUserTokenFromLS()
        set((state) => ({
            userStore: {
                ...state.userStore,
                isLogged: false,
                id: undefined,
                user: undefined,
                token: undefined,
            },
        }))
    },
    setError: (e) => {
        set((state) => ({userStore: {...state.userStore, error: e}}))
    },
    setIsLoading: (v) => {
        set((state) => ({userStore: {...state.userStore, isLoading: v}}))
    },
}))
