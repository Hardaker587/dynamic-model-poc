import { Configuration, AuthenticationApi } from '../../api'

const configuration = new Configuration()

const authenticationApi = new AuthenticationApi(configuration)

export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$authentication_api = authenticationApi

        app.provide('authentication_api', { authenticationApi })
    },
}
