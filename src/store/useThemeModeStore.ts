import {create} from 'zustand/react'
import {getThemeModeFromLS, setThemeModeToLS} from '../utils/localStorage.ts'

interface IStore {
    dark_mode: boolean
    setThemeMode: (value: boolean) => void
}

export const useThemeModeStore = create<IStore>((set) => ({
    dark_mode: getThemeModeFromLS(),
    setThemeMode: (value) => {
        set(() => ({dark_mode: value}))
        setThemeModeToLS(value)
    },
}))
