import {Box, IconButton} from '@mui/material'
import {useThemeModeStore} from '../../../store/useThemeModeStore.ts'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

export default function ToggleThemeMode() {
    const {dark_mode, setThemeMode} = useThemeModeStore()

    return (
        <Box>
            <IconButton
                sx={{ml: 1}}
                onClick={() => setThemeMode(!dark_mode)}
                title={dark_mode ? 'Turn Light Mode' : 'Turn Dark Mode'}>
                {dark_mode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    )
}
