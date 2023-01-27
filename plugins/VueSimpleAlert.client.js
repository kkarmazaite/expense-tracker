import { VueSimpleAlert } from 'vue3-simple-alert'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueSimpleAlert)
})