import { createApp } from 'vue'
import VueRouter from './router/router'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

var app = createApp(App);

app.use(ElementPlus).use(VueRouter.router).mount('#app')
