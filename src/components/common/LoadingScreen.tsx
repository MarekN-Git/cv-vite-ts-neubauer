import {Box, CircularProgress} from '@mui/material'

export default function LoadingScreen() {
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                flexGrow: 1,
            }}>
            <CircularProgress size={40} />
        </Box>
    )
}
