import { InjectionKey } from 'vue'
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex'

// Import modules
// =================== Auth
import AuthStateModule from './modules/auth'
import { AuthStateInterface } from './modules/auth/state'

export interface StateInterface {
    AuthStateModule: AuthStateInterface
}

declare module '@vue/runtime-core' {
    interface ComponentProperties {
        $store: VuexStore<StateInterface>
    }
}

export const storeKey: InjectionKey<VuexStore<StateInterface>> =
    Symbol('vuex-key')

export default store(function () {
    const Store = createStore<StateInterface>({
        modules: {
            AuthStateModule,
        },
        strict: !!import.meta.env.DEBUGGING,
    })
    return Store
})

export function useStore() {
    return vuexUseStore(storeKey)
}
