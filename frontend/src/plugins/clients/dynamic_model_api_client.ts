import { Configuration, DynamicModelsApi } from '../../api'

const configuration = new Configuration({ basePath: String(import.meta.env.VITE_BASE_URL)})
const dynamicModelApi = new DynamicModelsApi(configuration)
export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$dynamic_model_api = dynamicModelApi

        app.provide('dynamic_model_api', { dynamicModelApi })
    },
}
