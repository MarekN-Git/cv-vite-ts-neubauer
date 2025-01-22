enum LSKeys {
    ThemeMode = 'dark_mode',
    UserToken = 'user_token',
}

export function getThemeModeFromLS(): boolean {
    return localStorage.getItem(LSKeys.ThemeMode) === 'true'
}

export function setThemeModeToLS(isModeDark: boolean): void {
    localStorage.setItem(LSKeys.ThemeMode, String(isModeDark))
}

export function getUserTokenFromLS(): string | undefined {
    return localStorage.getItem(LSKeys.UserToken) || undefined
}

export function setUserTokenToLS(token: string): void {
    localStorage.setItem(LSKeys.UserToken, token)
}

export function removeUserTokenFromLS(): void {
    localStorage.removeItem(LSKeys.UserToken)
}
