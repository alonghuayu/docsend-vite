/*
 * @Author: withering 
 * @Date: 2021-10-20 18:12:42 
 * @Last Modified by: withering
 * @Last Modified time: 2021-10-25 18:41:22
 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss' // global css

function installApp() {
    const app = createApp(App);

    app.use(router)

    app.use(store)

    app.use(ElementPlus)

    app.mount('#app')
}

installApp()
