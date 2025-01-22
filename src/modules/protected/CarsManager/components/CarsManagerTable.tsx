import CarsSearch from '../../../../components/common/CarsSearch.tsx'
import CarsTableControl from '../../../../components/table/CarsTableControl.tsx'
import useRowControl from '../../../../components/table/hooks/useRowControl.ts'
import {ICarDetails} from '../../../public/CarsTable/utils/interface.ts'
import {TActionKeys} from '../hooks/useAction.ts'
import React, {useMemo} from 'react'

interface Props {
    cars: ICarDetails[]
    callAction: (car: ICarDetails | undefined, action: TActionKeys) => void
}

export default function CarsManagerTable({cars, callAction}: Props) {
    const {
        rows,
        filter: {searchFilterState, handleSearchFilterChange, clearFilter},
        sort: {sortState, handleSortChange},
    } = useRowControl<ICarDetails>({data: cars})

    return (
        <React.Fragment>
            <CarsSearch
                value={searchFilterState.text || ''}
                onChange={(v) => handleSearchFilterChange(v)}
                clearFilter={clearFilter}
            />

            {useMemo(
                () => (
                    <CarsTableControl
                        rows={rows}
                        sortState={sortState}
                        onSortClick={handleSortChange}
                        onAction={callAction}
                        editable
                    />
                ),
                [rows, sortState],
            )}
        </React.Fragment>
    )
}
