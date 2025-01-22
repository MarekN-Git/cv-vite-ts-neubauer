import {AppBar, Box} from '@mui/material'
import ToggleThemeMode from './ToggleThemeMode.tsx'
import Navigation from './Navigation.tsx'
import UserNavigation from './UserNavigation.tsx'

interface Props {
    height: number
}

export default function Header({height}: Props) {
    return (
        <AppBar
            position={'sticky'}
            sx={{
                display: 'grid',
                placeItems: 'center',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 1200,
                    height: height,
                    paddingLeft: 2,
                    paddingRight: 2,
                }}>
                <Navigation />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                    <UserNavigation />
                    <ToggleThemeMode />
                </Box>
            </Box>
        </AppBar>
    )
}
