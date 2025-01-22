import {Alert, Box} from '@mui/material'

interface Props {
    error: string
}
export default function ErrorScreen({error}: Props) {
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                flexGrow: 1,
                wordBreak: 'break-word',
            }}>
            <Alert severity={'error'}>
                <strong>Error: </strong>
                {error}
            </Alert>
        </Box>
    )
}
