import { GetterTree } from 'vuex'
import { StateInterface } from '../../index'
import { AuthStateInterface } from './state'

const getters: GetterTree<AuthStateInterface, StateInterface> = {
    RETURN_USER_TOKEN(state: AuthStateInterface) {
        return state.token
    },
    RETURN_USER(state: AuthStateInterface) {
        return state.user
    },
    RETURN_IS_LOGGED_IN(state: AuthStateInterface) {
        return state.loggedIn
    },
    RETURN_USER_ROLE(state: AuthStateInterface) {
        return state.role
    },
}

export default getters
