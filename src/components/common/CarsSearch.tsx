import {TextField, Typography} from '@mui/material'
import GridContainerSet from '../grid/GridContainerSet.tsx'
import GridItemSet from '../grid/GridItemSet.tsx'
import ClearFilterBtn from './ClearFilterBtn.tsx'

interface Props {
    value: string
    onChange: (value: string) => void
    clearFilter: () => void
    showInfo?: boolean
}
export default function CarsSearch({value, onChange, clearFilter, showInfo}: Props) {
    return (
        <GridContainerSet>
            {showInfo && (
                <GridItemSet size={{xs: 12}}>
                    <Typography component={'p'} fontStyle={'italic'} paddingLeft={2}>
                        Search filter across all columns except for the 'id' column:
                    </Typography>
                </GridItemSet>
            )}
            <GridItemSet size={{xs: 7}}>
                <TextField
                    label={'Search'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                />
            </GridItemSet>
            <GridItemSet size={{xs: 5}} sx={{textAlign: 'right', paddingTop: 1.2}}>
                <ClearFilterBtn onClick={clearFilter} />
            </GridItemSet>
        </GridContainerSet>
    )
}
