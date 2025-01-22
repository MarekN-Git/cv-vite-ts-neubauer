import {Outlet} from 'react-router-dom'
import {Box} from '@mui/material'
import Header from './Header.tsx'
import React from 'react'
import UserLoader from '../../auth/components/UserLoader.tsx'

export default function AppLayout() {
    const headerHeight = 70
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minWidth: 370,
                    gap: 1,
                }}>
                <Header height={headerHeight} />
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        flexDirection: 'center',
                        width: '100%',
                        maxWidth: 1200,
                        padding: 1,
                        border: `1px ${theme.palette.mode === 'dark' ? `${'#4a4a4a'}` : `${'#bababa'}`} solid`,
                        borderRadius: 1,
                        minHeight: `calc(100vh - ${headerHeight + 16}px)`,
                        overflow: 'auto',
                    })}>
                    <Outlet />
                </Box>
            </Box>
            {/** Loaders... */}
            <UserLoader />
        </React.Fragment>
    )
}
