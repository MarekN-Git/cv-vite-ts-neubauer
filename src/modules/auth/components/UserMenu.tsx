import {useUserStore} from '../../../store/useUserStore.ts'
import {useQueryClient} from '@tanstack/react-query'
import React, {useState} from 'react'
import {Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from '@mui/material'
import {Logout} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import {appRoutes} from '../../../router/routeRegister.ts'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {hasPermission} from '../utils/authUtils.ts'
import {UserRoles} from '../../../utils/enums.ts'

type TMenuItemsKey = 'LOGOUT' | 'OVERVIEW-PAGE' | 'CARS-MANAGER-PAGE'

export default function UserMenu() {
    const queryClient = useQueryClient()
    const {
        userStore: {user},
        logout,
    } = useUserStore()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMenuItemClick = (fn: TMenuItemsKey) => {
        switch (fn) {
            case 'OVERVIEW-PAGE':
                ;(() => {
                    navigate(appRoutes.Overview.url)
                })()
                break
            case 'CARS-MANAGER-PAGE':
                ;(() => {
                    navigate(appRoutes.CarsManager.url)
                })()
                break
            case 'LOGOUT':
                ;(() => {
                    logout(queryClient)
                })()
                break
        }
        handleClose()
    }

    return (
        <React.Fragment>
            <Tooltip title='Account settings'>
                <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ml: 2}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}>
                    <AccountCircleIcon fontSize={'medium'} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                backgroundColor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                <MenuItem onClick={() => handleMenuItemClick('OVERVIEW-PAGE')}>
                    <ListItemIcon>
                        <ArrowForwardIcon fontSize='small' />
                    </ListItemIcon>
                    Overview
                </MenuItem>
                {hasPermission([UserRoles.admin], user?.role) && (
                    <MenuItem onClick={() => handleMenuItemClick('CARS-MANAGER-PAGE')}>
                        <ListItemIcon>
                            <ArrowForwardIcon fontSize='small' />
                        </ListItemIcon>
                        Cars Manager
                    </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={() => handleMenuItemClick('LOGOUT')}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}
