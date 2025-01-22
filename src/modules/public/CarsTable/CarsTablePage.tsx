import useTitle from '../../../hooks/useTitle.ts'
import {Box, Typography} from '@mui/material'
import useRowControl from '../../../components/table/hooks/useRowControl.ts'
import {ICarDetails} from './utils/interface.ts'
import CarsSearch from '../../../components/common/CarsSearch.tsx'
import CarsTableControl from '../../../components/table/CarsTableControl.tsx'
import CarsColumnSearch from '../../../components/common/CarsColumnSearch.tsx'
import {useGetCars} from './hooks/useGetCars.ts'
import LoadingScreen from '../../../components/common/LoadingScreen.tsx'
import ErrorScreen from '../../../components/common/ErrorScreen.tsx'

export default function CarsTablePage() {
    useTitle('Cars')

    const {data, isLoading, isError, error} = useGetCars()

    const {
        rows,
        filter: {
            searchFilterState,
            handleSearchFilterChange,
            clearFilter,
            handleColumnFilterChange,
            columnFilterState,
        },
        sort: {sortState, handleSortChange},
    } = useRowControl<ICarDetails>({data: data?.cars || []})

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        return <ErrorScreen error={error} />
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                flexGrow: 1,
                gap: 2,
            }}>
            <Typography variant={'h4'}>Cars</Typography>

            <CarsColumnSearch
                columnFilterState={columnFilterState}
                onColumnChange={handleColumnFilterChange}
                clearFilter={clearFilter}
            />

            <CarsSearch
                value={searchFilterState.text || ''}
                onChange={(v) => handleSearchFilterChange(v, ['id'])}
                clearFilter={clearFilter}
                showInfo
            />

            <CarsTableControl rows={rows} sortState={sortState} onSortClick={handleSortChange} />
        </Box>
    )
}
