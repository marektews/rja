import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import store from './store'
app.use(store)

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

app.mount('#app')
