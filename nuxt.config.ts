// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
      ],
    runtimeConfig:{
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET
    },
    build: { transpile: ['@headlessui/vue'] }
})
