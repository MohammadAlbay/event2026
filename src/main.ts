/// <reference types="vue3-carousel" />
import { createApp } from 'vue'
import App from './App.vue'
import TopSection from './TopSection.vue'
import LowerSection from './LowerSection.vue'
import MiddleSection from './MiddleSection.vue'
import Rsvp from './Rsvp.vue'

import 'vue3-carousel/carousel.css'
// import CurtainEffect from 'curtain-opening-effect/vue';
createApp(App)
.component('TopSection', TopSection)
.component('LowerSection', LowerSection)
.component('MiddleSection', MiddleSection)
.component('Rsvp', Rsvp)
.mount('#app')