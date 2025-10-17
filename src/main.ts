import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Primevue
import PrimeVue from 'primevue/config'

// Own Styles
import '../global.css'

// Themes
import Lara from '@primeuix/themes/lara'

// Components
import { Button, DataTable, Column, DynamicDialog, DialogService } from 'primevue'

const app = createApp(App)

const root = document.documentElement
console.log(root)
root.classList.toggle('dark')

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
  options: {
    prefix: 'p',
    darkModeSelector: '.dark',
  },
  ripple: true,
})
app.use(DialogService)

app.component('PrimeButton', Button)
app.component('PrimeDataTable', DataTable)
app.component('PrimeColumn', Column)
app.component('PrimeDynamicDialog', DynamicDialog)

app.mount('#app')
