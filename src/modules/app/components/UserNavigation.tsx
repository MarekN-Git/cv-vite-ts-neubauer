import {Box, CircularProgress} from '@mui/material'
import UserLogin from '../../auth/components/UserLogin.tsx'
import {useUserStore} from '../../../store/useUserStore.ts'
import UserMenu from '../../auth/components/UserMenu.tsx'

export default function UserNavigation() {
    const {
        userStore: {isLogged, isLoading},
    } = useUserStore()
    if (isLoading) {
        return (
            <Box display={'inline-flex'}>
                <CircularProgress size={24} color={'warning'} />
            </Box>
        )
    }
    return <Box>{!isLogged ? <UserLogin /> : <UserMenu />}</Box>
}
