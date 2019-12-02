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
      {
        name: 'description',
        content:
          'A machine-learning-powered ingredient parser API. Parse your recipe ingredients into clean, structured JSON. Built to power the best food apps online.',
      },
      {
        name: 'og:description',
        content:
          'A machine-learning-powered ingredient parser API. Parse your recipe ingredients into clean, structured JSON. Built to power the best food apps online.',
      },
      {
        name: 'og:image',
        content: 'https://zestfuldata.com/images/ingredient-translation.jpg',
      },
      {name: 'og:image:width', content: '635'},
      {name: 'og:image:height', content: '558'},
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
    ],
  },
  buildModules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-122091312-1',
      },
    ],
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'bootstrap-vue/nuxt',
  ],
  sitemap: {
    hostname: 'https://zestfuldata.com/',
    gzip: true,
    exclude: ['/404'],
  },
  robots: {
    sitemap: 'https://zestfuldata.com/sitemap.xml',
  },
};
