import {Configuration, UsersApi} from '../../api'

const configuration = new Configuration({ basePath: String(import.meta.env.VITE_BASE_URL)})
const usersApi = new UsersApi(configuration)
export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$user_api = usersApi

        app.provide('user_api', { usersApi })
    },
}
