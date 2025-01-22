import {jwtDecode} from 'jwt-decode'
import {IUserJwtDetails} from './interface.ts'

/** Decode JWT payload. */
export function getUserJwtDetailsFromToken(token: string): IUserJwtDetails | undefined {
    try {
        return token !== '' ? (jwtDecode(token) as IUserJwtDetails) : undefined
    } catch (e) {
        console.error(e)
        return undefined
    }
}

/** Check if user have permission. */
export function hasPermission(acceptRoles: string[], userRoles: string[] | undefined): boolean {
    if (userRoles) {
        for (const item of userRoles) {
            if (acceptRoles.indexOf(item) > -1) {
                return true
            }
        }
    }
    return false
}
