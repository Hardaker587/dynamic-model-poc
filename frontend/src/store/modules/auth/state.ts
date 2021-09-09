import RoleEnums from '../../../enums/authroles.enum'

export interface AuthStateInterface {
    token: string
    user: Record<string, unknown>
    loggedIn: Boolean
    role: RoleEnums
}

function state(): AuthStateInterface {
    return {
        token: '',
        user: {},
        loggedIn: false,
        role: RoleEnums.user,
    }
}

export default state
