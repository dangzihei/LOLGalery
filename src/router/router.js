import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'Rank',
        component: () => import('../StrategyCenter/Rank.vue')
    },
    {
        path: '/Melee',
        name: 'Melee',
        component: () => import('../StrategyCenter/Melee.vue')
    },
    {
        path: '/DbRank',
        name: 'DbRank',
        component: () => import('../StrategyCenter/DbRank.vue')
    },
    {
        path: '/Strategy',
        name: 'Strategy',
        component: () => import('../StrategyCenter/Strategy.vue')
    },
    {
        path: '/Hero',
        name: 'Hero',
        component: () => import('../StrategyCenter/Hero.vue')
    },
    {
        path: '/kit',
        name: 'kit',
        component: () => import('../StrategyCenter/kit.vue')
    },
    {
        path: '/FunData',
        name: 'FunData',
        component: () => import('../StrategyCenter/FunData.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    base: import.meta.env.BASE_URL,
    routes
})

export default router

