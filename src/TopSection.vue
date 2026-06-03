<script setup lang="ts">
</script>

<template>
    <section>
        <div class="top-event-tagline">
            <span>An Exclusive Presentation</span>
            <h2 class="event-main-title">SPF & Style Event</h2>
        </div>

        <div class="top-section-image-container">

            <img class="top-section-image-stamp left"
                src="https://laportadiroma.com/events/spf-and-styles/assets/renew-logo-kOAqBqHq.jpg" alt="">
            <img class="top-section-image-stamp right"
                src="https://laportadiroma.com/events/spf-and-styles/assets/lpdr - logo-Bwsvy8AD.jpg" alt="">
        </div>

        <div class="top-section-title-container">
            <span class="brand-sub-label">Joint Exclusive Event</span>
            <h1 class="brand-heading">
                La Porta Di Roma <span class="brand-separator">•</span> Renew
            </h1>
        </div>


    </section>

</template>



<style>
.top-section-title-container {
    text-align: center;
    margin: 2.5rem auto 1.5rem auto;
    padding: 0 1rem;
}

.brand-sub-label {
    font-family: 'Arial', sans-serif;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: #8b8577;
    display: block;
    margin-bottom: 1rem;
}

.brand-heading {
    font-family: 'Georgia', serif;
    font-weight: 300;
    font-size: 1.5rem;
    letter-spacing: 0.05em;
    color: #111;
    margin: 0;
}

.brand-separator {
    font-size: 1.1rem;
    color: #bcae97;
    vertical-align: middle;
    margin: 0 0.4rem;
}

.top-section-image-container {

    position: relative;
    display: block;
    align-content: center;
    width: 20em;
    margin: 0 auto;
    height: 140px;
    overflow: hidden;
    padding: 0px;
    margin-top: 1.5em !important;
}

.top-section-image-stamp {
    width: min(20vw, 5em);
    max-width: 5em;
    height: auto;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 0em;
    padding-bottom: 2.5em;
    display: block;

    width: min(20vw, 20vw);
    height: auto;
    border-radius: 50%;
    display: block;

    position: absolute;
    top: 50%;
    left: 50%;
}




.top-section-image-stamp.left {
    transform: translate(-93%, -50%) rotate(-15deg);
}


.top-section-image-stamp.right {
    transform: translate(-2%, -50%) rotate(15deg);
}
</style>

<style>
.top-event-tagline {
    text-align: center;
    margin: 4rem auto 2rem auto;
    padding: 0 1rem;
}

.top-event-tagline span {
    font-family: 'Arial', sans-serif;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: #8b8577;
    display: block;
    margin-bottom: 0.4rem;
}

.event-main-title {
    font-family: 'Georgia', serif;
    font-weight: 300;
    font-size: 1.25rem;
    font-style: italic;
    letter-spacing: 0.05em;
    color: #222;
    margin: 0;
}
</style>