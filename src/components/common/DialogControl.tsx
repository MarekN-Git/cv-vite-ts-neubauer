import {Box, Dialog, IconButton} from '@mui/material'
import {ReactNode} from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
    children: ReactNode
    open?: boolean
    onClose?: () => void
    onIconClose: () => void
    disableFullWidth?: boolean
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function DialogControl({
    children,
    open,
    onClose,
    disableFullWidth,
    size,
    onIconClose,
}: Props) {
    return (
        <Dialog
            open={open !== undefined ? open : true}
            onClose={onClose}
            maxWidth={size}
            fullWidth={!disableFullWidth}
            tabIndex={-1}
            scroll={'body'}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    gap: 1,
                }}>
                <Box
                    sx={{
                        position: 'relative',
                        left: 15,
                        top: -15,
                        height: 0,
                        textAlign: 'end',
                    }}>
                    <IconButton onClick={onIconClose}>
                        <CloseIcon fontSize={'small'} />
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Dialog>
    )
}
