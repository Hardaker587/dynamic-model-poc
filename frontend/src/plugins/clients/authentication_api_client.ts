import { Configuration, AuthenticationApi } from '../../api'

const configuration = new Configuration({ basePath: String(import.meta.env.VITE_BASE_URL)})
const authenticationApi = new AuthenticationApi(configuration)
export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$authentication_api = authenticationApi

        app.provide('authentication_api', { authenticationApi })
    },
}
