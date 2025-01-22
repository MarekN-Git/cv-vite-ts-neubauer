import {QueryClient} from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (_failureCount, error) => {
                if (_failureCount >= 0) return false
                return !!error
            },
        },
    },
})
