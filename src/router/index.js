import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("../view/Home.vue")
    },
    {
        path: '/selection',
        name: 'selection',
        component: () => import("../view/Selection.vue")
    },
    {
        path: '/selection/:id',
        name: 'selectionDetail',
        component: () => import("../view/selectionDetail.vue")
    },
    {
        path: '/voting',
        name: 'voting',
        component: () => import("../view/voting.vue")
    },


]
const router = new VueRouter({
    routes
})
export default router
