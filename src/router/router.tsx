import {createBrowserRouter} from 'react-router-dom'
import AppLayout from '../modules/app/components/AppLayout.tsx'
import {appRoutes} from './routeRegister.ts'
import LandingPage from '../modules/public/Landing/LandingPage.tsx'
import CarsTablePage from '../modules/public/CarsTable/CarsTablePage.tsx'
import NoMatchPage from '../modules/public/NoMatch/NoMatchPage.tsx'
import ProtectedRouter from '../modules/auth/ProtectedRouter.tsx'
import Overview from '../modules/protected/Overview/Overview.tsx'
import CarsManager from '../modules/protected/CarsManager/CarsManager.tsx'

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {path: appRoutes.Landing.url, element: <LandingPage />},
            {path: appRoutes.CarsTable.url, element: <CarsTablePage />},
            {path: appRoutes.NoMatch.url, element: <NoMatchPage />},
            {
                element: <ProtectedRouter />,
                children: [
                    {path: appRoutes.Overview.url, element: <Overview />},
                    {path: appRoutes.CarsManager.url, element: <CarsManager />},
                ],
            },
        ],
    },
])
