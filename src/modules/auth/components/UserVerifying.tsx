import {Box, LinearProgress} from '@mui/material'

export default function UserVerifying() {
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                flexGrow: 1,
            }}>
            <Box>
                User Verifying...
                <LinearProgress />
            </Box>
        </Box>
    )
}
