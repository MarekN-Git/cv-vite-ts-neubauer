import {useLocation} from 'react-router-dom'
import {Box, Typography} from '@mui/material'
import useTitle from '../../../hooks/useTitle.ts'

export default function NoMatchPage() {
    useTitle('Error: 404')
    const location = useLocation()

    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                flexGrow: 1,
                padding: 3,
                wordBreak: 'break-all',
            }}>
            <Box>
                <Typography variant={'h5'} textAlign={'center'}>
                    Error 404...
                </Typography>
                <Typography component={'span'} color={'red'}>
                    {`${location.pathname}${location.search}`}
                </Typography>
                <Typography component={'span'} paddingLeft={0.5}>
                    not found.
                </Typography>
            </Box>
        </Box>
    )
}
