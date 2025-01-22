import {createTheme} from '@mui/material'

export const theme = (mode: 'light' | 'dark') =>
    createTheme({
        palette: {
            mode,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                    },
                },
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: '7px 7px 7px 7px',
                    },
                },
                defaultProps: {
                    size: 'small',
                },
            },
            MuiTextField: {
                defaultProps: {
                    size: 'small',
                    variant: 'outlined',
                },
            },
            MuiSelect: {
                defaultProps: {
                    size: 'small',
                    variant: 'outlined',
                },
            },
            MuiInputLabel: {
                defaultProps: {
                    size: 'small',
                },
            },
            MuiIconButton: {
                defaultProps: {
                    size: 'small',
                },
            },
        },
    })
