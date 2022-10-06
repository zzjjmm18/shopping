import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import '@/assets/styles/index.less'

import UI from '@/components/library/index'

createApp(App).use(store).use(router).use(UI).mount('#app')
