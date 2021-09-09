import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './index.css'
import user_api_client from './plugins/clients/user_api_client'
import profile_api_client from './plugins/clients/profile_api_client'
import authentication_api_client from './plugins/clients/authentication_api_client'
import dynamic_model_api_client from './plugins/clients/dynamic_model_api_client'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(user_api_client)
app.use(profile_api_client)
app.use(authentication_api_client)
app.use(dynamic_model_api_client)
app.mount('#app')
