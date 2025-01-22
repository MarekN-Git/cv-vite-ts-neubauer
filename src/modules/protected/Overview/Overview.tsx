import {Box} from '@mui/material'
import {useUserStore} from '../../../store/useUserStore.ts'
import useTitle from '../../../hooks/useTitle.ts'

export default function Overview() {
    useTitle('Overview')
    const {
        userStore: {user},
    } = useUserStore()
    return (
        <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                flexGrow: 1,
                fontSize: 30,
            }}>
            Welcome, {user?.username}!
        </Box>
    )
}
