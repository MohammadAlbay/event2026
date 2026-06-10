<script setup lang="ts">
import { ref } from 'vue';

const showPlayOverlay = ref(true);

const props = defineProps<{
    audioObject?: HTMLAudioElement | null
}>();

const onUserPlay = async () => {
    const audio = props.audioObject;
    if (!audio) return;
    try {
        audio.muted = false;
        audio.currentTime = 10;
        // audio.volume = 0.5;
        await audio.play();
        showPlayOverlay.value = false; // Hides the entire gate overlay
    } catch (e) {
        console.warn('Playback still failed after user interaction:', e);
    }
};
</script>

<template>
    <div v-if="showPlayOverlay" class="entrypoint-toplayer">

        <!-- Only this specific central element accepts the user interaction -->
        <button @click="onUserPlay" class="wax-seal-target" aria-label="Press to Open">
            <!-- This container can remain empty if the seal is part of intro.jpg, 
                 or you can drop a dedicated seal asset <img> tag right here -->
        </button>

    </div>
</template>

<style>
.entrypoint-toplayer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #f4ede1;
    /* High-end fallback background tone */
    background-image: url('https://laportadiroma.com/events/spf-and-styles/assets/intro-BQhfrrI6.jpg');
    /* Adjust path syntax depending on your Vite config alias */
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    /* Keeps it layered completely over map containers and navigation bars */
}

/* Precise Center Target Mask over the Wax Seal graphic seen in image_b2eaa8.jpg */
.wax-seal-target {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    /* Perfect circular click mask matching the dimension of a physical design seal */
    width: 120px;
    height: 120px;
    border-radius: 50%;

    /* Clean interactive scale response for mouse-over states */
    transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
    -webkit-tap-highlight-color: transparent;
    /* Removes ugly blue mobile click box highlights */
}

.wax-seal-target:hover {
    transform: scale(1.05);
}

.wax-seal-target:active {
    transform: scale(0.95);
}
</style>