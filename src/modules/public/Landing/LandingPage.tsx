import {Box, Typography} from '@mui/material'
import useTitle from '../../../hooks/useTitle.ts'

export default function LandingPage() {
    useTitle('Home')
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                flexGrow: 1,
            }}>
            <Typography
                sx={(theme) => ({
                    fontSize: 50,
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 25,
                    },
                })}>
                CV - Project - Neubauer
            </Typography>
        </Box>
    )
}
