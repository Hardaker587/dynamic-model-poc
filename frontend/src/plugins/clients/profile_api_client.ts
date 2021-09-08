import {Configuration, ProfileApi} from '../../api'

const configuration = new Configuration({ basePath: String(import.meta.env.VITE_BASE_URL)})
const profileApi = new ProfileApi(configuration)
export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$profile_api = profileApi

        app.provide('profile_api', { profileApi })
    },
}
