import { MutationTree } from 'vuex'
import { AuthStateInterface } from './state'
import RoleEnums from '../../../enums/authroles.enum'

const mutations: MutationTree<AuthStateInterface> = {
    SET_USER(state: AuthStateInterface, user: Record<string, unknown>) {
        state.user = user
    },
    SET_LOGGED_IN(state: AuthStateInterface, loggedIn: boolean) {
        state.loggedIn = loggedIn
    },
    SET_USER_ROLE(state: AuthStateInterface, role: RoleEnums) {
        state.role = role
    },
}

export default mutations
