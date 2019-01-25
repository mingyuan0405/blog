module.exports = {
    publicPath: '',
    outputDir: process.env.NODE_ENV === 'production' ? '../web' : '../../dev/electron/electron-quick-start/web',
    lintOnSave: false,
    productionSourceMap: process.env.NODE_ENV === 'production',
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        modules: false
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/qoquoApi': {
                target: 'http://[::1]/qoquo/',
                // ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/qoquoApi': ''
                }
            },
        },
        before: app => {}
    },
    pluginOptions: {
        jQuery: "jquery",
        $: "jquery"
    }
}
