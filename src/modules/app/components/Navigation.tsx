import {Box} from '@mui/material'
import NavLink from '../../../components/common/NavLink.tsx'
import {appRoutes} from '../../../router/routeRegister.ts'

export default function Navigation() {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                gap: 2,
            }}>
            <NavLink to={appRoutes.Landing.url}>Home</NavLink>
            <NavLink to={appRoutes.CarsTable.url}>Cars</NavLink>
        </Box>
    )
}
