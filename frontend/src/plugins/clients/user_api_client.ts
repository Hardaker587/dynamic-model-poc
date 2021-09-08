import { Configuration, UsersApi } from '../../api'

export default {
    install: (app: any, options: any) => {
        const baseUrl = import.meta.env.BASE_URL
        const configuration = new Configuration()
        const userApi = new UsersApi(configuration)

        app.config.globalProperties.$user_api = userApi
        app.provide('user_api', userApi)
    },
}
