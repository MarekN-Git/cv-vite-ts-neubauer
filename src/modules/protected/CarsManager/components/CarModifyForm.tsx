import {ICarDetails} from '../../../public/CarsTable/utils/interface.ts'
import DialogControl from '../../../../components/common/DialogControl.tsx'
import {Alert, Box, Button, LinearProgress, Typography} from '@mui/material'
import {useMutateCreateCar} from '../hooks/useMutateCreateCar.ts'
import {useUserStore} from '../../../../store/useUserStore.ts'
import {SubmitHandler, useForm} from 'react-hook-form'
import {TActionKeys} from '../hooks/useAction.ts'
import GridContainerSet from '../../../../components/grid/GridContainerSet.tsx'
import GridItemSet from '../../../../components/grid/GridItemSet.tsx'
import FormTextField from '../../../../components/form/FormTextField.tsx'
import FormSelectField from '../../../../components/form/FormSelectField.tsx'
import {getSelectOptions} from '../../../../utils/utils.ts'
import {CarOptions} from '../../../../utils/carOptions.ts'
import {carFormRules} from '../utils/carFormRules.ts'

interface Props {
    car: ICarDetails | undefined
    onClose: () => void
    action: TActionKeys
}

export default function CarModifyForm({car, action, onClose}: Props) {
    const {
        userStore: {token},
    } = useUserStore()

    const {mutateAsync, data, isPending, isError, error, isSuccess, reset} =
        useMutateCreateCar(token)

    const defaultCarValues: ICarDetails = {
        id: 0,
        name: '',
        model: '',
        brand: '',
        color: '',
        year: 2025,
        fuelType: '',
        transmission: '',
        mileage: 0,
        price: 0,
    }

    const useFormMethods = useForm<ICarDetails>({
        defaultValues: car ? car : defaultCarValues,
    })

    const onSubmit: SubmitHandler<ICarDetails> = async (data) => {
        const resultCarValues: ICarDetails = {
            ...data,
            name: `${data.brand} - ${data.model}`,
        }

        reset()

        mutateAsync(resultCarValues, {
            onSuccess: () => {
                if (action === 'CREATE') {
                    useFormMethods.reset(defaultCarValues)
                }
                if (action === 'UPDATE') {
                    useFormMethods.setValue('name', resultCarValues.name)
                }
            },
        })
    }

    const handleClose = () => {
        if (!isPending) {
            onClose()
        }
    }

    const currentBrand = useFormMethods.watch('brand')

    return (
        <DialogControl open={true} onClose={handleClose} onIconClose={handleClose} size={'sm'}>
            <Typography component={'span'} fontWeight={'bold'} textAlign={'center'}>
                {action === 'CREATE'
                    ? 'Create new car:'
                    : `Update: ${useFormMethods.getValues('name')}`}
            </Typography>

            <Box
                component={'form'}
                onSubmit={useFormMethods.handleSubmit(onSubmit)}
                sx={{display: 'grid', gap: 1.5}}>
                <GridContainerSet>
                    <GridItemSet size={{xs: 12, sm: 6}}>
                        <FormSelectField
                            name={'brand'}
                            control={useFormMethods.control}
                            label={'Brand'}
                            onChange={() => useFormMethods.setValue('model', '')}
                            menuItems={getSelectOptions(
                                Object.entries(CarOptions.brandsWithModels).map(([key]) => key),
                            )}
                            rules={carFormRules.brand}
                        />
                    </GridItemSet>
                    <GridItemSet size={{xs: 12, sm: 6}}>
                        <FormSelectField
                            name={'model'}
                            control={useFormMethods.control}
                            label={'Model'}
                            menuItems={getSelectOptions(
                                currentBrand
                                    ? CarOptions.brandsWithModels[
                                          currentBrand as keyof typeof CarOptions.brandsWithModels
                                      ]
                                    : [],
                            )}
                            rules={carFormRules.model}
                            selectInfo={currentBrand ? undefined : 'First select Brand!'}
                        />
                    </GridItemSet>
                    <GridItemSet size={{xs: 12, sm: 4}}>
                        <FormTextField
                            name={'year'}
                            control={useFormMethods.control}
                            label={'Year'}
                            rules={carFormRules.year}
                        />
                    </GridItemSet>
                    <GridItemSet size={{xs: 12, sm: 4}}>
                        <FormTextField
                            name={'mileage'}
                            control={useFormMethods.control}
                            label={'Mileage'}
                            rules={carFormRules.mileage}
                        />
                    </GridItemSet>
                    <GridItemSet size={{xs: 12, sm: 4}}>
                        <FormTextField
                            name={'price'}
                            control={useFormMethods.control}
                            label={'Price'}
                            rules={carFormRules.price}
                        />
                    </GridItemSet>
                    <GridItemSet size={{xs: 12, sm: 6}}>
                        <FormSelectField
                            name={'fuelType'}
                            control={useFormMethods.control}
                            label={'Fuel Type'}
                            menuItems={getSelectOptions(CarOptions.fuelType)}
                            rules={carFormRules.fuelType}
                        />
                    </GridItemSet>
                    <GridItemSet size={{xs: 12, sm: 6}}>
                        <FormSelectField
                            name={'transmission'}
                            control={useFormMethods.control}
                            label={'Transmission'}
                            menuItems={getSelectOptions(CarOptions.transmission)}
                            rules={carFormRules.transmission}
                        />
                    </GridItemSet>
                    <GridItemSet size={{xs: 12}}>
                        <FormTextField
                            name={'color'}
                            control={useFormMethods.control}
                            label={'Color'}
                        />
                    </GridItemSet>
                </GridContainerSet>

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

                    {action === 'CREATE' ? (
                        <Button variant={'contained'} type={'submit'} disabled={isPending}>
                            Create
                        </Button>
                    ) : (
                        <Button
                            variant={'contained'}
                            color={'success'}
                            type={'submit'}
                            disabled={isPending}>
                            Update
                        </Button>
                    )}
                </Box>
            </Box>

            {isError && <Alert severity={'error'}>Error: {error}</Alert>}
            {isSuccess && <Alert severity={'success'}>{data}</Alert>}
            {isPending && <LinearProgress />}
        </DialogControl>
    )
}
