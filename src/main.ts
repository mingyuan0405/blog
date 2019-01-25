import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Iview from 'iview';
import User from './library/user';

import '@/assets/less/iview.less';
import '@/assets/less/index.less';

Vue.config.productionTip = false;

Vue.use(Iview)
Vue.use(User);

Vue.prototype.axios = axios;
Vue.prototype.api = process.env.NODE_ENV === 'electron' ? 'http://blog.qoquo.com/qoquoApi/basic/web/' : '/qoquoApi/basic/web/' ;

axios.interceptors.response.use(
    response => {
        if (response.data.code != 200 ) {
            new Vue().$Message.error('后台不想给你回话，并抛出了异常.');
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                // case 500:
                    localStorage.removeItem('JWT_TOKEN_SMS');
                    clearCookie();
                    router.replace({
                        path: '/login',
                        // query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)
    }
);



new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
