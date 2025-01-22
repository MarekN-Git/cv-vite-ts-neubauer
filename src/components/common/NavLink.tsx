import {Link as RouterLink} from 'react-router-dom'
import {Link, LinkProps} from '@mui/material'

interface Props extends LinkProps {
    to: string
}

export default function NavLink(props: Props) {
    const {to, ...linkProps} = props
    return (
        <Link
            {...linkProps}
            to={to}
            component={RouterLink}
            sx={(theme) => ({
                textDecoration: 'none',
                '&:link': {
                    color: theme.palette.text.primary,
                },
                '&:visited': {
                    color: theme.palette.text.primary,
                },
                '&:hover': {
                    color: theme.palette.text.primary,
                    textDecoration: 'underline',
                },
                '&:active': {
                    color: theme.palette.text.primary,
                },
            })}
        />
    )
}
