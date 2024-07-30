import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./main.scss"
import store from './stores/store'
export const app = createApp(App)

app.use(store)

app.use(router)
app.mount('#app')
