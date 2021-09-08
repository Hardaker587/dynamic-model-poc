import { Configuration, ProfileApi } from '../../api'

export default {
    install: (app: any, options: any) => {
        const baseUrl: string = import.meta.env.VITE_BASE_URL as string
        const configuration = new Configuration({ basePath: 'http://localhost:5000' })
        const profileApi = new ProfileApi(configuration)

        app.provide('profile_api', { profileApi })
    },
}
