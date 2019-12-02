export default {
  env: {
    backendUrl: process.env.VUE_APP_BACKEND_URL,
  },
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    titleTemplate: '%s | Zestful',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
    ],
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/sitemap', 'bootstrap-vue/nuxt'],
  sitemap: {
    hostname: 'https://zestfuldata.com/',
    gzip: true,
    exclude: ['/404'],
  },
};
