import { Configuration, DynamicModelsApi } from '../../api'

const baseUrl = import.meta.env.BASE_URL
const configuration = new Configuration({ basePath: baseUrl })

const dynamicModelApi = new DynamicModelsApi(configuration)

export default {
    install: (app: any, options: any) => {
        app.config.globalProperties.$dynamic_model_api = dynamicModelApi

        app.provide('dynamic_model_api', { dynamicModelApi })
    },
}
