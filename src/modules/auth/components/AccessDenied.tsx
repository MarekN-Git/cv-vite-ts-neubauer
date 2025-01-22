import {Alert, Box} from '@mui/material'

interface Props {
    message: string
}

export default function AccessDenied({message}: Props) {
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                flexGrow: 1,
            }}>
            <Alert severity={'error'}>
                Error: <strong>Access Denied</strong> - {message}
            </Alert>
        </Box>
    )
}
