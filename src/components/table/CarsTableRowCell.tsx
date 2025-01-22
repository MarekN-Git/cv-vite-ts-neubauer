import {TableCell} from '@mui/material'

interface Props {
    text: string | number
    breakPoint?: number
    align?: 'left' | 'right' | 'center'
}
export default function CarsTableRowCell({text, align, breakPoint}: Props) {
    return (
        <TableCell
            sx={(theme) => ({
                textAlign: align,
                [theme.breakpoints.down(breakPoint ? breakPoint : 0)]: {
                    display: 'none',
                },
            })}>
            {text}
        </TableCell>
    )
}
