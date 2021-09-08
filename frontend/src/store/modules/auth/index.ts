import { Module } from 'vuex'
import { StateInterface } from '../../index'
import state, { AuthStateInterface } from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const AuthStateModule: Module<AuthStateInterface, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
}
export default AuthStateModule
