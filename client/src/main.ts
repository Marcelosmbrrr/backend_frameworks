import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/main.css';
import App from './App.vue';
import router from './router';

// Fontawesome core 
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faDoorOpen, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
library.add(faGear, faDoorOpen, faSun, faMoon);

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
