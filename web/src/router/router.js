import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'Rank',
        title: '峡谷排位',
        meta:{
          show:true  
        },
        component: () => import('../StrategyCenter/Rank.vue')
    },
    {
        path: '/Melee',
        name: 'Melee',
        title: '大乱斗',
        component: () => import('../StrategyCenter/Melee.vue')
    },
    {
        path: '/DbRank',
        name: 'DbRank',
        title: '最佳双排',
        component: () => import('../StrategyCenter/DbRank.vue')
    },
    {
        path: '/Strategy',
        name: 'Strategy',
        title: '精品攻略',
        component: () => import('../StrategyCenter/Strategy.vue')
    },
    {
        path: '/Hero',
        name: 'Hero',
        title: '英雄列表',
        component: () => import('../StrategyCenter/Hero.vue')
    },
    {
        path: '/kit',
        name: 'kit',
        title: '装备列表',
        component: () => import('../StrategyCenter/kit.vue')
    },
    {
        path: '/FunData',
        name: 'FunData',
        title: '趣味数据',
        component: () => import('../StrategyCenter/FunData.vue')
    },
    {
        path: '/Detail',
        name: 'Detail',
        title: '英雄详情',
        component: () => import('../StrategyCenter/Detail.vue')
    }
]

routes.forEach(i => {
    i.path = import.meta.env.BASE_URL + i.path.substring(1)
})

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default {
    routes: routes,
    router: router
}

