import { createApp } from 'vue'
import vueRouter from './router/router'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import request from '@/request/request'

var app = createApp(App);
app.config.globalProperties.$reqHeroList= await request.requestHeroList()

app.use(ElementPlus).use(vueRouter).mount('#app')
