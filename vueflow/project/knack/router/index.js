import Vue from 'vue'
import Router from 'vue-router'
import Knack from '../components/Knack'
import Detail from '../components/Detail'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    // history: true,
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // },
    routes: [
        {
            path: '/:category',
            name: 'Knack',
            component: Knack,
            meta: { keepAlive: true }
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail,
            meta: { keepAlive: false }
        },
        {
            path: '*',
            redirect: '/0'
        }
    ]
})
