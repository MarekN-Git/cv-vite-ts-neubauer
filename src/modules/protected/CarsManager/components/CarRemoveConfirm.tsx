import DialogControl from '../../../../components/common/DialogControl.tsx'
import {Alert, Box, Button, LinearProgress, Typography} from '@mui/material'
import {ICarDetails} from '../../../public/CarsTable/utils/interface.ts'
import {useMutateRemoveCar} from '../hooks/useMutateRemoveCar.ts'
import {useUserStore} from '../../../../store/useUserStore.ts'

interface Props {
    car: ICarDetails
    onClose: () => void
}

export default function CarRemoveConfirm({car, onClose}: Props) {
    const {
        userStore: {token},
    } = useUserStore()
    const {mutateAsync, isPending, isError, error} = useMutateRemoveCar(token)

    const handleRemoveCar = async () => {
        mutateAsync(car.id, {
            onSuccess: () => onClose(),
        })
    }

    const handleClose = () => {
        if (!isPending) {
            onClose()
        }
    }
    return (
        <DialogControl open={true} onClose={handleClose} onIconClose={handleClose} size={'xs'}>
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                }}>
                <Typography
                    component={'p'}
                    textAlign={'center'}
                    fontWeight={'bold'}
                    color={'warning'}>
                    Delete confirm:
                </Typography>
                <Box display={'grid'}>
                    <Typography component={'span'} fontStyle={'italic'}>
                        Are you sure you want to delete this car?
                    </Typography>
                    <strong>ID: {car.id}</strong>
                    <strong>Name: {car.name}</strong>
                </Box>
                <Box
                    sx={{
                        display: 'inline-flex',
                        justifyContent: 'end',
                        gap: 2,
                        width: '100%',
                    }}>
                    <Button
                        variant={'contained'}
                        color={'inherit'}
                        onClick={handleClose}
                        disabled={isPending}>
                        Cancel
                    </Button>
                    <Button
                        variant={'contained'}
                        color={'warning'}
                        onClick={handleRemoveCar}
                        disabled={isPending}>
                        Confirm
                    </Button>
                </Box>
                {isError && <Alert severity={'error'}>Error: {error}</Alert>}
                {isPending && <LinearProgress />}
            </Box>
        </DialogControl>
    )
}
