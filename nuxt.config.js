module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'val-bank',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,minimum-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [{src:'~/assets/css/common.less',lang:'less'}],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  // env
  env: {
    // PATH_TYPE: process.env.PATH_TYPE
    ENV_NAME:process.env.ENV_NAME
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
