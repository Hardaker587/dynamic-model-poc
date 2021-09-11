import { AuthenticationService } from '../../service/authentication.service'

export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$authentication_api =
            new AuthenticationService()

        app.provide('authentication_api', { AuthenticationService })
    },
}
