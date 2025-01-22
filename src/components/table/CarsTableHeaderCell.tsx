import {IconButton, TableCell} from '@mui/material'
import {TOrder} from './utils/type.ts'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {ICarDetails} from '../../modules/public/CarsTable/utils/interface.ts'
import React from 'react'

interface Props {
    label: string
    name?: keyof ICarDetails
    sortState?: {order: TOrder; name: keyof ICarDetails | string}
    onClick?: (name: keyof ICarDetails, order: TOrder) => void
    breakPoint?: number
}
export default function CarsTableHeaderCell({label, sortState, breakPoint, onClick, name}: Props) {
    return (
        <TableCell
            sx={(theme) => ({
                textAlign: 'center',
                fontWeight: 'bold',
                [theme.breakpoints.down(breakPoint ? breakPoint : 0)]: {
                    display: 'none',
                },
            })}>
            {label}{' '}
            {onClick && name && sortState && (
                <React.Fragment>
                    {sortState.order === 'asc' && name === sortState.name ? (
                        <IconButton onClick={() => onClick(name, sortState.order)}>
                            <ArrowDropUpIcon fontSize={'small'} />
                        </IconButton>
                    ) : (
                        <IconButton onClick={() => onClick(name, sortState.order)}>
                            <ArrowDropDownIcon fontSize={'small'} />
                        </IconButton>
                    )}
                </React.Fragment>
            )}
        </TableCell>
    )
}
