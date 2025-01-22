import {ICarDetails} from '../../modules/public/CarsTable/utils/interface.ts'
import {GridSize, TextField, Typography} from '@mui/material'
import {ResponsiveStyleValue} from '@mui/system'
import BasicSelect from './BasicSelect.tsx'
import {getSelectOptions} from '../../utils/utils.ts'
import {CarOptions} from '../../utils/carOptions.ts'
import GridContainerSet from '../grid/GridContainerSet.tsx'
import GridItemSet from '../grid/GridItemSet.tsx'
import ClearFilterBtn from './ClearFilterBtn.tsx'

interface Props {
    columnFilterState: Partial<ICarDetails>
    onColumnChange: (key: keyof ICarDetails, value: any) => void
    clearFilter: () => void
}

export default function CarsColumnSearch({columnFilterState, onColumnChange, clearFilter}: Props) {
    const gridSizeBreakpoint: ResponsiveStyleValue<GridSize> | undefined = {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
    }
    const modelSelectOptions = getSelectOptions(
        columnFilterState.brand
            ? CarOptions.brandsWithModels[
                  columnFilterState.brand as keyof typeof CarOptions.brandsWithModels
              ]
            : [],
    )
    return (
        <GridContainerSet>
            <GridItemSet size={{xs: 12}}>
                <Typography component={'p'} fontStyle={'italic'} paddingLeft={2}>
                    Search by specific columns on input change:
                </Typography>
            </GridItemSet>
            <GridItemSet size={gridSizeBreakpoint}>
                <TextField
                    label={'By-Name'}
                    value={columnFilterState.name || ''}
                    onChange={(e) => onColumnChange('name', e.target.value)}
                    fullWidth
                />
            </GridItemSet>
            <GridItemSet size={gridSizeBreakpoint}>
                <BasicSelect
                    label={'By-Brand'}
                    value={columnFilterState.brand}
                    menuItems={getSelectOptions(
                        Object.entries(CarOptions.brandsWithModels).map(([key]) => key),
                    )}
                    onChange={(value) => {
                        onColumnChange('brand', value)
                        onColumnChange('model', '')
                    }}
                />
            </GridItemSet>
            <GridItemSet size={gridSizeBreakpoint}>
                <BasicSelect
                    label={'By-Model'}
                    value={columnFilterState.model}
                    selectInfo={modelSelectOptions.length === 0 ? 'First select Brand!' : undefined}
                    menuItems={modelSelectOptions}
                    onChange={(value) => onColumnChange('model', value)}
                />
            </GridItemSet>
            <GridItemSet size={gridSizeBreakpoint}>
                <TextField
                    label={'By-Mileage'}
                    value={columnFilterState.mileage || ''}
                    onChange={(e) => onColumnChange('mileage', e.target.value)}
                    fullWidth
                />
            </GridItemSet>
            <GridItemSet size={gridSizeBreakpoint}>
                <TextField
                    label={'By-Price'}
                    value={columnFilterState.price || ''}
                    onChange={(e) => onColumnChange('price', e.target.value)}
                    fullWidth
                />
            </GridItemSet>
            <GridItemSet size={gridSizeBreakpoint}>
                <BasicSelect
                    label={'By-FuelType'}
                    value={columnFilterState.fuelType}
                    menuItems={getSelectOptions(CarOptions.fuelType)}
                    onChange={(value) => onColumnChange('fuelType', value)}
                />
            </GridItemSet>
            <GridItemSet size={gridSizeBreakpoint}>
                <BasicSelect
                    label={'By-TransMission'}
                    value={columnFilterState.transmission}
                    menuItems={getSelectOptions(CarOptions.transmission)}
                    onChange={(value) => onColumnChange('transmission', value)}
                />
            </GridItemSet>
            <GridItemSet size={{xs: 12}} textAlign={'right'}>
                <ClearFilterBtn onClick={clearFilter} />
            </GridItemSet>
        </GridContainerSet>
    )
}
