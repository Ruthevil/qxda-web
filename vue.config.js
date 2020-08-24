// vue.config.js
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const cssOptions = {
    // 默认情况下，只有*.module.[ext] 结尾的文件才会被视作CSS Modules模块
    // 设置为false后你就可以去掉文件名中的.module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为CSS Modules模块
    requireModuleExtension: false,
    // 是否为css生成.map文件
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
        css: {
            modules: {
                rules: [
                    {
                        test: /\.styl$/,
                        use: ['style-loader', 'css-loader', 'stylus-loader'],
                    }
                ]
            }
        },
        postcss: {
            modules: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        // require('autoprefixer'), // 默认已经引入
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
}
const devServerOptions = {
    headers: {},
    // 允许外部ip访问
    host: '0.0.0.0',
    port: 8888,
    https: false,
    // 错误、警告在页面弹出
    overlay: {
        warnings: true,
        errors: true
    },
    // 没有匹配到静态文件的请求都代理到以下地址
    proxy: {
        '/api': {
            target: 'http://localhost:8888',
            ws: true,
            changeOrigin: true
        },
    }
}
const configureWebpack = config => {
    if (process.env.NODE_ENV === 'production') {
        let optimization = {
            runtimeChunk: 'single',
            // 将每个依赖包打包成单独的js文件
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                            return `npm.${packageName.replace('@', '')}`
                        }
                    }
                }
            },
            minimizer: [
                // 插件配置移除console
                new TerserPlugin({
                    terserOptions: {
                        ecma: undefined,
                        warnings: false,
                        parse: {},
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']
                        }
                    },
                }),
            ],
        }
        Object.assign(config, {
            optimization
        })
    }
    Object.assign(config, {
        // 别名配置
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        },
        // 不使用webpack处理编译的依赖库，通过CMD、AMD、window全局方式使用
        externals: {
            jquery: 'jQuery',
            echarts: 'echarts',
            lodash: '_'
        }
    })
}
const chainWebpack = config => {
    config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
        return options
    })
}

module.exports = {
    // 部署应用包时的基本URL，在以下情况下，应当避免使用相对publicPath:
    // 当使用基于HTML5 history.pushState的路由时；当使用pages选项构建多页面应用时
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    // 生成的生产环境构建文件的目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的目录,相对于outputDir
    assetsDir: 'static',
    // 指定生成的index.html的输出路径，相对于outputDir，也可以是一个绝对路径
    indexPath: 'index.html',
    // 生成的静态资源文件名中包含hash以便更好的控制缓存
    filenameHashing: true,
    // 禁用每次保存时lint代码
    lintOnSave: false,
    // 不使用包含运行时编译器的Vue构建版本
    runtimeCompiler: false,
    // 配置通过Babel显式转译的依赖
    transpileDependencies: [],
    // 生产环境下不生成.map文件
    productionSourceMap: false,
    // css文件相关配置
    css: cssOptions,
    // 开发环境下server配置
    devServer: devServerOptions,
    // 在系统的CPU多于一个内核时自动为Babel使用thread-loader，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,
    // 向PWA插件传递选项
    pwa: {},
    // 第三方插件配置
    pluginOptions: {},
    // 其他webpack配置
    configureWebpack: config => {
        configureWebpack(config)
    },
    // 对内部的webpack配置进行更细粒度的修改，
    chainWebpack: config => {
        chainWebpack(config)
    }
}
