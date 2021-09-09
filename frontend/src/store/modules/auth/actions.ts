import { ActionTree } from 'vuex'
import { StateInterface } from '../../index'
import { AuthStateInterface } from './state'

const actions: ActionTree<AuthStateInterface, StateInterface> = {
    COMMIT_USER_TOKEN({ commit }, token) {
        commit('SET_USER_TOKEN', token)
    },
    COMMIT_USER({ commit }, user) {
        commit('SET_USER', JSON.parse(user))
    },
    COMMIT_LOGGED_IN({ commit }, loggedIn) {
        commit('SET_LOGGED_IN', loggedIn)
    },
    COMMIT_USER_ROLE({ commit }, role) {
        commit('SET_USER_ROLE', role)
    },
}

export default actions
