import Vue from 'vue';
import Router,{Route} from 'vue-router';
import Home from './views/front/home.vue';

Vue.use(Router);

const router = new Router({
    mode: process.env.NODE_ENV === 'production' ? 'history' : 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/essay',
            name: 'essay',
            component: () => import(/* webpackChunkName: "login" */ './views/front/essay.vue'),
        },
        {
            path: '/time',
            name: 'time',
            component: () => import(/* webpackChunkName: "login" */ './views/front/time.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ './views/admin/login.vue'),
        },
        {
            path: '/essaies',
            name: 'essaies',
            component: () => import(/* webpackChunkName: "login" */ './views/admin/essaies.vue'),
        },
    ],
});

router.beforeEach((to:Route, from:Route, next:Function) => {
    next();
})

router.afterEach((to:Route, from:Route) => {

})

export default router
