import {Button} from '@mui/material'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

interface Props {
    onClick: () => void
}

export default function ClearFilterBtn({onClick}: Props) {
    return (
        <Button
            variant={'contained'}
            startIcon={<FilterAltOffIcon fontSize={'small'} />}
            onClick={onClick}
            sx={{paddingRight: 2}}>
            Clear Filter
        </Button>
    )
}
