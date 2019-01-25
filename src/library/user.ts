export default {
    install: function (Vue : any, options: any ) {
        Vue.prototype.$user = {
            get type() {
                if (localStorage.getItem('TOKEN_BLOG')) {
                    if (localStorage.getItem('TOKEN_BLOG') == 'MINGMINGYUANYUAN') {
                        return 1
                    }
                    if (localStorage.getItem('TOKEN_BLOG') == 'YUEZOUYUEYUAN') {
                        return 2;
                    }
                }
                return 0;
            },
            set type(type){
                if (type == 0) {
                    localStorage.removeItem('TOKEN_BLOG');
                }
            },
            get ip() {
                if (localStorage.getItem('TOKEN_IP')) {
                    return localStorage.getItem('TOKEN_IP');
                }
            },
            set ip(ip : any){
                localStorage.setItem('TOKEN_IP',ip);
            },
        };
    }
};