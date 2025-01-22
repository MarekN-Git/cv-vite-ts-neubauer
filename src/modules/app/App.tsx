import {CssBaseline, ThemeProvider} from '@mui/material'
import {theme} from '../../theme/theme'
import {RouterProvider} from 'react-router-dom'
import {router} from '../../router/router.tsx'
import {useThemeModeStore} from '../../store/useThemeModeStore.ts'
import {queryClient} from '../../api/queryClientConfig.ts'
import {QueryClientProvider} from '@tanstack/react-query'

function App() {
    const {dark_mode} = useThemeModeStore()

    return (
        <ThemeProvider theme={theme(dark_mode ? 'dark' : 'light')}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
