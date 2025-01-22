interface IUserDetails {
    id: number
    username: string
    email: string
    role: string[]
}

interface IUser {
    user: IUserDetails
}

interface IUserJwtDetails {
    id: number
}

interface ILoginResponse {
    jwt: string
}

interface IUserLoginInput {
    email: string
    password: string
}

export type {IUserDetails, IUserLoginInput, IUserJwtDetails, ILoginResponse, IUser}
