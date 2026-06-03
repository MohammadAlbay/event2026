<script setup lang="ts">
import { CountDown, TimeRemaining } from './composable/CountDown';
import { Carousel, Slide } from 'vue3-carousel'
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{ (e: 'trigger-rsvp'): void }>()

const handleRsvpClick = () => {
    emit('trigger-rsvp')
}

const imagesFetched = [
    'A6R_0922-1-e1679641965667-1600x900.webp',
    'art-gallery-event-stockcake.jpg',
    'OIP.webp',
    'Various-artists-Pinta-Miami-2023-exhibition-view-Courtesy-of-Pinta-Miami-2023.jpg'
];
const images_slideshow = ref(imagesFetched.map((filename: string) => `https://laportadiroma.com/events/spf-and-styles/assets/images/show/${filename}`))


const props = defineProps({
    eventDateString: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false,
    }
})


// Use null as the initial state before mounting
const countDown = ref<CountDown | null>(null);
const tr = ref(new TimeRemaining());

onMounted(() => {
    const eventDate = props.eventDateString;
    console.log('TopSection mounted with prop date string: ', eventDate);

    countDown.value = new CountDown({ targetDate: new Date(eventDate), timeInterval: 1000 }, false);

    let initTimeRemaining = countDown.value.getTimeRemaining();
    tr.value.days = initTimeRemaining.days;
    tr.value.hours = initTimeRemaining.hours;
    tr.value.minutes = initTimeRemaining.minutes;
    tr.value.seconds = initTimeRemaining.seconds;

    countDown.value.setContinuesUpdateCallback((timeRemaining: TimeRemaining) => {
        tr.value.days = timeRemaining.days;
        tr.value.hours = timeRemaining.hours;
        tr.value.minutes = timeRemaining.minutes;
        tr.value.seconds = timeRemaining.seconds;
    });
});

onUnmounted(() => {
    // Safely stop if instantiated
    countDown.value?.stop();
});

</script>

<template>

    <section>
        <div class="top-section-coundown-container">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div class="slot">
                                <span class="countdown-value">{{ tr.days || 0 }}</span>
                                <span class="countdown-label">Days</span>
                            </div>
                        </td>
                        <td>
                            <div class="slot">
                                <span class="countdown-value">{{ tr.hours || 0 }}</span>
                                <span class="countdown-label">Hours</span>
                            </div>
                        </td>
                        <td>
                            <div class="slot">
                                <span class="countdown-value">{{ tr.minutes || 0 }}</span>
                                <span class="countdown-label">Minutes</span>
                            </div>
                        </td>
                        <td>
                            <div class="slot">
                                <span class="countdown-value">{{ tr.seconds || 0 }}</span>
                                <span class="countdown-label">Seconds</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="event-time-badge">
                <p class="event-date">Thursday, June 4, 2026</p>
                <p class="event-time">07:30 PM</p>
            </div>

        </div>
    </section>

    <section>
        <div class="event-details-group">
            <div class="venue-badge">
                <span class="venue-label">Location</span>
                <h3 class="venue-title">La Porta Di Roma Showroom</h3>
                <p class="venue-city">Tripoli, Libya</p>
            </div>

            <div class="cta-container">
                <button class="rsvp-button" @click="handleRsvpClick">
                    <span>Reserve Your Seat</span>
                    <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    </section>

    <section style=" margin:0 auto; margin-top: 3em; width: 100%; text-align: center;">
        <h3>Join Our Event</h3>
        <Carousel :autoplay="1" :transition="3000" :wrap-around="true" :items-to-show="2.2"
            :mouse-drag="{ threshold: 0.5 }" :touch-drag="false" :snap-align="'end'" :pause-autoplay-on-hover="true"
            :infinite-scroll="true" transition-easing="linear">
            <Slide v-for="(img, slide) in images_slideshow" :key="slide" class="carousel-slide-wrapper">
                <div class="carousel__item_card">
                    <img class="carousel-marquee-img" :src="img" alt="Event Sponsor">
                </div>
            </Slide>
        </Carousel>
    </section>
</template>


<style>
:deep(.carousel__track) {
    transition-timing-function: linear !important;
}

/* 2. Slide structure setup */
.carousel-slide-wrapper {
    /* Remove the raw 'height: 12em' constraint from the outer item */
    padding: 0 16px;
    /* Controls the horizontal gap/padding between the squares */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 3. The square card frame */
.carousel__item_card {
    width: 100%;
    /* Crucial: Keeps the box a perfect square regardless of screen sizing */
    aspect-ratio: 1 / 1;

    overflow: hidden;
    border-radius: 12px;
    /* Smooth rounded corners */
    background-color: transparent;
    /* Changed from white to blend nicely with your beige body */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 4. The asset sizing inside the card */
.carousel-marquee-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Use 'contain' if the asset is an absolute logo, 'cover' if it's a full-bleed photo */
    display: block;
}
</style>

<style>
.event-time-badge {
    margin: 2.5rem auto;
    text-align: center;
    /* border-top: 1px solid #dcd7ca;
    border-bottom: 1px solid #dcd7ca; */
    border-top: 1px solid #dcd7ca;
    border-bottom: 1px solid #dcd7ca;
    padding: 1rem 0;
    max-width: 280px;
}

.event-date {
    font-family: 'Georgia', serif;
    font-size: 1.15rem;
    font-style: italic;
    margin: 0;
    color: #333;
}

.event-time {
    font-size: 0.85rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0.3rem 0 0 0;
    color: #666;
}

/* .slot b {
    color: rgb(66, 63, 63);
    margin-bottom: .34em;
    font-size: .9em;
}

.slot input {
    margin-top: .5em;
    width: 2.5em;
    height: 2.5em;
    text-align: center;
    font-size: 1.4em;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
    border: 2px solid rgb(31, 29, 28);
    margin: 0.5em .2em;
    border-radius: 2em;
    background-color: rgb(248, 248, 248);
    color: rgb(56, 43, 7);
    mouse-events: none;
    cursor: default;
    outline: none;
} */

.slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.4em 0.2em;
}

.countdown-value {
    font-size: 2.2rem;
    /* Make the numbers prominent and elegant */
    font-family: 'Georgia', serif;
    font-weight: 300;
    color: #111;
    margin-bottom: 0.2em;
}

.countdown-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #666;
    font-family: 'Arial', sans-serif;
}

.top-section-coundown-container table {
    width: 100%;
    margin: 0 auto;
    /* background-color: green; */
}

.top-section-coundown-container table tr td,
.top-section-coundown-container table tr {
    padding: 0px;
    margin: 0px;
}

.top-section-coundown-container table .slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* max-width: 5em; */
    width: 100%;
    overflow: hidden;
}

.top-section-coundown-container {
    width: 50vw;
    max-width: fit-content;
    /* background-color: rgb(9, 8, 8); */
    margin: 0 auto;
    border-radius: 2em;
    padding: 1em 0.5em;
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    margin-top: 5em;
    font-family: 'Arial', sans-serif;
    font-style: normal;
    font-weight: 200;
    overflow: hidden;
}

@media only screen and (max-width: 500px) {
    .top-section-coundown-container {
        width: 95% !important;
        margin: 0 auto;
    }

}
</style>


<style>
.event-details-group {
    margin-top: 3rem;
    margin-bottom: 4rem;
    text-align: center;
}

.venue-badge {
    margin-bottom: 2.5rem;
    font-family: 'Arial', sans-serif;
}

.venue-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #78778b;
    /* color: #8b8577; */
    display: block;
    margin-bottom: 0.5rem;
}

.venue-title {
    font-family: 'Georgia', serif;
    font-weight: 300;
    font-size: 1.35rem;
    color: #111;
    margin: 0 0 0.2rem 0;
}

.venue-city {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
    letter-spacing: 0.05em;
}

/* --- button design --- */
.cta-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.rsvp-button {
    background-color: #111;
    color: #fff;
    border: none;
    padding: 1rem 2.5rem;
    font-family: 'Arial', sans-serif;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* small interactions on Hover css */
.rsvp-button:hover {
    background-color: #2b2721;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.rsvp-button:active {
    transform: translateY(1px);
}

/* icon size */
.arrow-icon {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
    transition: transform 0.3s ease;
}

.rsvp-button:hover .arrow-icon {
    transform: translateX(4px);
}
</style>