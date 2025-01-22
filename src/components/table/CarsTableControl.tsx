import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import {ICarDetails} from '../../modules/public/CarsTable/utils/interface.ts'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CarsTableHeaderCell from './CarsTableHeaderCell.tsx'
import {TOrder} from './utils/type.ts'
import CarsTableRowCell from './CarsTableRowCell.tsx'
import {TActionKeys} from '../../modules/protected/CarsManager/hooks/useAction.ts'

interface Props {
    rows: ICarDetails[]
    editable?: boolean
    sortState: {order: TOrder; name: keyof ICarDetails | string}
    onSortClick: (name: keyof ICarDetails, order: TOrder) => void
    onAction?: (car: ICarDetails, action: TActionKeys) => void
}

export default function CarsTableControl({
    rows,
    editable,
    sortState,
    onSortClick,
    onAction,
}: Props) {
    const breakpoints = {
        mileage: 600,
        fuelType: 700,
        transmission: 850,
        color: 750,
        brand: 650,
        model: 550,
        year: 500,
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {editable && <CarsTableHeaderCell label={'#'} />}
                    <CarsTableHeaderCell label={'P.'} />
                    <CarsTableHeaderCell
                        label={'Name'}
                        name={'name'}
                        sortState={sortState}
                        onClick={onSortClick}
                    />
                    <CarsTableHeaderCell label={'Brand'} breakPoint={breakpoints.brand} />
                    <CarsTableHeaderCell label={'Model'} breakPoint={breakpoints.model} />
                    <CarsTableHeaderCell label={'Year'} breakPoint={breakpoints.year} />
                    <CarsTableHeaderCell label={'Color'} breakPoint={breakpoints.color} />
                    <CarsTableHeaderCell
                        label={'Transmission'}
                        breakPoint={breakpoints.transmission}
                    />
                    <CarsTableHeaderCell label={'Fuel type'} breakPoint={breakpoints.fuelType} />
                    <CarsTableHeaderCell
                        label={'Mileage'}
                        name={'mileage'}
                        sortState={sortState}
                        onClick={onSortClick}
                        breakPoint={breakpoints.mileage}
                    />
                    <CarsTableHeaderCell
                        label={'Price'}
                        name={'price'}
                        sortState={sortState}
                        onClick={onSortClick}
                    />
                    {editable && <CarsTableHeaderCell label={'Action'} />}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((car, index) => (
                    <TableRow key={car.id} hover>
                        {editable && <CarsTableRowCell align={'center'} text={`#${car.id}`} />}
                        <CarsTableRowCell align={'center'} text={index + 1} />
                        <CarsTableRowCell text={car.name} />
                        <CarsTableRowCell
                            align={'center'}
                            text={car.brand}
                            breakPoint={breakpoints.brand}
                        />
                        <CarsTableRowCell
                            align={'center'}
                            text={car.model}
                            breakPoint={breakpoints.model}
                        />
                        <CarsTableRowCell
                            align={'center'}
                            text={car.year}
                            breakPoint={breakpoints.year}
                        />
                        <CarsTableRowCell
                            align={'center'}
                            text={car.color}
                            breakPoint={breakpoints.color}
                        />
                        <CarsTableRowCell
                            align={'center'}
                            text={car.transmission}
                            breakPoint={breakpoints.transmission}
                        />
                        <CarsTableRowCell
                            align={'center'}
                            text={car.fuelType}
                            breakPoint={breakpoints.fuelType}
                        />
                        <CarsTableRowCell
                            align={'right'}
                            text={`${car.mileage} Km`}
                            breakPoint={breakpoints.mileage}
                        />
                        <CarsTableRowCell align={'right'} text={`${car.price} Kč`} />
                        {editable && (
                            <TableCell sx={{textAlign: 'center', whiteSpace: 'nowrap'}}>
                                <IconButton onClick={() => onAction && onAction(car, 'UPDATE')}>
                                    <EditIcon fontSize={'small'} />
                                </IconButton>
                                <IconButton onClick={() => onAction && onAction(car, 'DELETE')}>
                                    <DeleteIcon fontSize={'small'} />
                                </IconButton>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
