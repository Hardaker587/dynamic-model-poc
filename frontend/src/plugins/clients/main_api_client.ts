import {
    Configuration,
    UsersApi,
    AuthenticationApi,
    ProfileApi,
    DynamicModelsApi,
} from '../../api'

const baseUrl = import.meta.env.BASE_URL
const configuration = new Configuration({ basePath: baseUrl })

const userApi = new UsersApi(configuration)
const authenticationApi = new AuthenticationApi(configuration)
const profileApi = new ProfileApi(configuration)
const dynamicModelApi = new DynamicModelsApi(configuration)

export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$user_api = userApi
        app.config.globalProperties.$authentication_api = authenticationApi
        app.config.globalProperties.$profile_api = profileApi
        app.config.globalProperties.$dynamic_model_api = dynamicModelApi

        app.provide('user_api', { userApi })
        app.provide('authentication_api', { authenticationApi })
        app.provide('profile_api', { profileApi })
        app.provide('dynamic_model_api', { dynamicModelApi })
    },
}
