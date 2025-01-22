import useTitle from '../../../hooks/useTitle.ts'
import {useGetCars} from '../../public/CarsTable/hooks/useGetCars.ts'
import LoadingScreen from '../../../components/common/LoadingScreen.tsx'
import ErrorScreen from '../../../components/common/ErrorScreen.tsx'
import {Box, Button, Typography} from '@mui/material'
import useAction from './hooks/useAction.ts'
import CarsManagerTable from './components/CarsManagerTable.tsx'
import AddIcon from '@mui/icons-material/Add'
import ActionDialog from './components/ActionDialog.tsx'

export default function CarsManager() {
    useTitle('Cars Manager')

    const {actionState, callAction, clearAction} = useAction()
    const {data, isLoading, isError, error} = useGetCars()

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
            <Typography variant={'h4'}>Cars Manager</Typography>

            <Button
                variant={'contained'}
                startIcon={<AddIcon fontSize={'small'} />}
                onClick={() => callAction(undefined, 'CREATE')}
                sx={{alignSelf: 'end', paddingRight: 2, marginRight: 0.65}}>
                Create Car
            </Button>

            <CarsManagerTable cars={data?.cars || []} callAction={callAction} />

            <ActionDialog actionState={actionState} clearAction={clearAction} />
        </Box>
    )
}
