import { createStore } from 'vuex'
// Import modules
// =================== Auth
import AuthStateModule from './modules/auth'
import { AuthStateInterface } from './modules/auth/state'

export interface StateInterface {
    AuthStateModule: AuthStateInterface
}

export const store = createStore({
    modules: {
        AuthStateModule,
    },
})
