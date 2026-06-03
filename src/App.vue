<script setup lang="ts">
import { ref } from 'vue'
import LowerSection from './LowerSection.vue';
import MiddleSection from './MiddleSection.vue';
// import TopSection from './TopSection.vue'
const isRsvpOpen = ref(false)

const openRsvp = () => {
    console.log('Opening RSVP Modal...')
    isRsvpOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeRsvp = () => {
    isRsvpOpen.value = false
    document.body.style.overflow = ''
}
</script>

<template>
    <div class="app-container">
        <b>{{ }}</b>
        <TopSection :text="'how about you'"></TopSection>
        <MiddleSection :eventDateString="'2026-06-10T10:59:50+02:00'" @trigger-rsvp="openRsvp"></MiddleSection>
        <LowerSection></LowerSection>

        <Rsvp :show="isRsvpOpen" @close-rsvp="closeRsvp" />
        <!-- <h1>Count: {{ count }}</h1> -->
        <!-- <button @click="count++">+1</button> -->
    </div>
</template>

<style>
h1,
h2,
h3,
h4 {
    font-family: 'Georgia', 'Times New Roman', serif;
    letter-spacing: 0.05em;
}

html,
body {
    overflow-x: hidden !important;
}
</style>
<style>
.app-container {

    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    /* width: 100%; */
    max-width: 800px;
    margin: 0 auto;
    width: 100% !important;
    border-color: red;
    outline: none;
    padding: 0px;
    background-color: rgb(237, 233, 223);
    /* background-color: rgb(212, 198, 161); */
    padding: 0px;
    overflow-y: auto;
    overflow-x: hidden !important;
    background-size: 90% 90%;
    /* margin: 0px; */
}

@media only screen and (min-width: 600px) {
    .app-container {
        /* padding: 10px; */
        width: 600px;
        left: 50%;
        transform: translateX(-50%);
    }

    body {
        background-color: rgb(248, 248, 248);
    }
}
</style>