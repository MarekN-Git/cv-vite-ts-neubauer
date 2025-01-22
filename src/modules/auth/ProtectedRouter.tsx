import {Outlet, useLocation} from 'react-router-dom'
import {appRoutes} from '../../router/routeRegister.ts'
import {useUserStore} from '../../store/useUserStore.ts'
import AccessDenied from './components/AccessDenied.tsx'
import {hasPermission} from './utils/authUtils.ts'
import UserVerifying from './components/UserVerifying.tsx'

export default function ProtectedRouter() {
    const {
        userStore: {isLogged, user, isLoading, error},
    } = useUserStore()
    const {pathname} = useLocation()

    if (isLoading) {
        return <UserVerifying />
    }

    if (!isLogged || error) {
        return <AccessDenied message={error ? error : 'You are not logged!'} />
    }

    if (isLogged && user) {
        for (const [_, route] of Object.entries(appRoutes)) {
            if (pathname === route.url && hasPermission(route.role || [], user.role)) {
                return <Outlet />
            }
        }

        return <AccessDenied message={'You dont have permission!'} />
    }
}
