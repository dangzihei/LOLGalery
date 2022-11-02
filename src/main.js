import { createApp } from 'vue'
import vueRouter from './router/router'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



createApp(App).use(ElementPlus).use(vueRouter).mount('#app')
