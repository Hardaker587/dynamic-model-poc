import RoleEnums from '../../../enums/authroles.enum'

export interface AuthStateInterface {
    user: Record<string, unknown>
    loggedIn: Boolean
    role: RoleEnums
}

function state(): AuthStateInterface {
    return {
        user: {},
        loggedIn: false,
        role: RoleEnums.user,
    }
}

export default state
