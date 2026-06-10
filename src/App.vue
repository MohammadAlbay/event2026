<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LowerSection from './LowerSection.vue';
import MiddleSection from './MiddleSection.vue';
import EntryPoint from './EntryPoint.vue';
// import TopSection from './TopSection.vue'
const isRsvpOpen = ref(false)

// Audio controls and fallback UI
const bgAudio = ref<HTMLAudioElement | null>(null)
// const startAtSeconds = 90
const showPlayOverlay = ref(false)

// const tryAutoplay = async (audio: HTMLAudioElement) => {
//     try {
//         await audio.play()
//         // autoplay succeeded (likely muted), hide overlay
//         showPlayOverlay.value = false
//     } catch (err) {
//         // autoplay blocked — show a play/unmute button
//         console.warn('Audio autoplay was blocked; showing play overlay.')
//         showPlayOverlay.value = true
//     }
// }

// onMounted(() => {
//     const audio = bgAudio.value
//     if (!audio) return
//     audio.volume = 0.5
//     const prepareAndPlay = () => {
//         // set desired seek position once metadata is available
//         try {
//             audio.currentTime = startAtSeconds
//         } catch (e) {
//             console.warn('Unable to set audio currentTime now; it may be set after more loading.')
//         }
//         tryAutoplay(audio)
//         onUserPlay()
//     }

//     // Prefer `loadedmetadata` then `canplay` to ensure seeking works.
//     audio.addEventListener('loadedmetadata', prepareAndPlay, { once: true })
//     audio.addEventListener('canplay', () => {
//         // If metadata already fired, prepareAndPlay will run; this helps on some browsers.
//         if (!showPlayOverlay.value) return

//         onUserPlay()
//         tryAutoplay(audio)
//     }, { once: true })
// })

const openRsvp = () => {
    console.log('Opening RSVP Modal...')
    isRsvpOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeRsvp = () => {
    isRsvpOpen.value = false
    document.body.style.overflow = ''
}

// Called by the visible fallback button when autoplay is blocked
// const onUserPlay = async () => {
//     const audio = bgAudio.value
//     if (!audio) return
//     try {
//         // Unmute when user explicitly interacts
//         audio.muted = false
//         await audio.play()
//         showPlayOverlay.value = false
//     } catch (e) {
//         console.warn('Playback still failed after user interaction:', e)
//     }
// }
</script>

<template>
    <!-- embedd audio auto play in backgroubd and seek to 1:30 -->
    <audio ref="bgAudio" autoplay loop muted playsinline>
        <source src="/src/assets/audio/hey_mama.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>

    <EntryPoint :audio-object="bgAudio"></EntryPoint>
    <!-- Fallback overlay shown when autoplay is blocked -->
    <div v-if="showPlayOverlay" style="display: none;" class="audio-overlay">
        <!-- <button class="audio-play-button" @click="onUserPlay">Play audio</button> -->
    </div>

    <div class="app-container">
        <b>{{ }}</b>
        <TopSection :text="'how about you'"></TopSection>
        <MiddleSection :eventDateString="'2026-06-21T16:30:01+02:00'" @trigger-rsvp="openRsvp"></MiddleSection>
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
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    width: 100% !important;
    /* border-color: red; */
    outline: none;
    padding: 0px;
    background-color: rgba(209, 170, 206, .3);
    background-image: url('https://laportadiroma.com/events/spf-and-styles/assets/bg-c3908m85.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: repeat-y;
    /* background-color: rgb(237, 233, 223); */
    /* background-color: rgb(212, 198, 161); */
    padding: 0px;
    overflow-y: auto;
    overflow-x: hidden !important;
    /* background-size: 90% 90%; */
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

/* Audio fallback overlay styles */
.audio-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.45);
    z-index: 9999;
}

.audio-play-button {
    background: #fff;
    border: none;
    padding: 12px 18px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}
</style>