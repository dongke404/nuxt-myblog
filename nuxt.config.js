import apiConfig from './config/api.config'

export default {
  mode: 'universal',
  env: {
    BASE: apiConfig.BASE,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'styleSheet', type: 'text/css', href: '//at.alicdn.com/t/font_1755605_61dxxq5374d.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/iconfont.css',
    '~assets/styles/app.scss',
    'swiper/css/swiper.css',
    'highlight.js/styles/night-owl.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  styleResources: {
    scss: [
      '~/assets/styles/init.scss',
    ]
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: apiConfig.BASE
  },

  build: {
    extractCSS: true,
    extend(config, ctx) {
    }
  },
  router: {
    // middleware: ['change-page-col'],
    //可设置当前路由按钮的class
    linkActiveClass: 'link-active',
    middleware: 'test1'
  },
  plugins: [
    { src: '~/plugins/marked' },
    { src: '~/plugins/highlight' },
    { src: '~/plugins/extend' },
    { src: '~/plugins/lozad', mode: 'client' },
    { src: '~/plugins/swiper', mode: 'client' },
    { src: '~/plugins/popup', mode: 'client' },
    { src: '~/plugins/day', mode: 'client' },
  ]
}
