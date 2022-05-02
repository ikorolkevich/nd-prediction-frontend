export type User = {
    id: string,
    email: string,
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean
}

export type AuthState = {
    user: User|null
}

export type LoginRequestData = {
    username: string,
    password: string
}

export type RegistrationRequestData = {
    email: string,
    password: string
}


export type UpdateEmailRequestData = {
    email: string
}


export type UpdatePasswordRequestData = {
    password: string
}