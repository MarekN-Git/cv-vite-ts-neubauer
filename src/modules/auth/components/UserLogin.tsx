import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import {useState} from 'react'
import React from 'react'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined'
import {useUserLogin} from '../hooks/useUserLogin'
import {IUserLoginInput} from '../utils/interface.ts'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useUserStore} from '../../../store/useUserStore.ts'
import LoginIcon from '@mui/icons-material/Login'
import DialogControl from '../../../components/common/DialogControl.tsx'
import FormTextField from '../../../components/form/FormTextField.tsx'

export default function UserLogin() {
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
        if (!isPending) {
            setOpen(false)
        }
    }

    const {mutate, error, isError, isPending} = useUserLogin()

    const {control, handleSubmit, setValue} = useForm<IUserLoginInput>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const {login} = useUserStore()

    const onSubmit: SubmitHandler<IUserLoginInput> = async (data) => {
        mutate(data, {
            onSuccess: (response) => {
                login(response.jwt)
                handleClose()
            },
            onError: () => {
                setValue('password', '')
            },
        })
    }

    const breakPoint = useMediaQuery(useTheme().breakpoints.up(450))

    return (
        <React.Fragment>
            <Box sx={{padding: 0.5, display: 'flex', alignItems: 'center'}}>
                <Button
                    variant={'contained'}
                    onClick={() => setOpen(true)}
                    startIcon={<LoginIcon fontSize={'small'} />}>
                    Login
                </Button>
            </Box>

            <DialogControl
                open={open}
                onClose={handleClose}
                onIconClose={handleClose}
                size={'xs'}
                disableFullWidth={breakPoint}>
                <Box
                    component={'form'}
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'grid',
                        placeItems: 'center',
                        gap: 2,
                        width: '100%',
                        minWidth: breakPoint ? 300 : '',
                    }}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Typography component={'span'} variant={'h6'}>
                            Login
                        </Typography>
                        <LockPersonOutlinedIcon />
                    </Box>

                    <FormTextField
                        name={'email'}
                        control={control}
                        label={'Email'}
                        type={'email'}
                        rules={{
                            required: 'E-mail is required.',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: 'Wrong E-mail format.',
                            },
                        }}
                        autoFocus={true}
                        autoComplete={'on'}
                    />

                    <FormTextField
                        name={'password'}
                        control={control}
                        label={'Password'}
                        type={'password'}
                        rules={{
                            required: 'Password is required.',
                        }}
                        autoComplete={'current-password'}
                    />

                    {isError && (
                        <Alert severity={'error'} sx={{width: '100%'}}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        disabled={isPending}
                        variant={'contained'}
                        type={'submit'}
                        endIcon={
                            <React.Fragment>
                                {isPending && <CircularProgress color={'secondary'} size={20} />}
                            </React.Fragment>
                        }>
                        Confirm
                    </Button>
                </Box>
            </DialogControl>
        </React.Fragment>
    )
}
