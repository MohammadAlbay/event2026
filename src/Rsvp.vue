<script setup lang="ts">
// import { Transition } from 'vue'
// Receive open/close state from parent

const props = defineProps<{
    show: boolean
}>()
// console.log('RSVP Modal Component Initialized with show prop:', props);
// Declare event to tell parent to close the layout
const emit = defineEmits<{
    (e: 'close-rsvp'): void
}>()

const emitClose = () => {
    emit('close-rsvp')
}

const handleRSVPSubmit = () => {
    console.log('Premium Reservation Processing...')
    // After saving information safely, close the modal view
    emitClose()
}

import { watch } from 'vue'
watch(() => props.show, (newVal) => {
    console.log('Rsvp.vue intercepted visibility change:', newVal)
})
</script>

<template>
    <Transition name="fade-luxury">
        <!-- Bind the template visibility directly to the incoming 'show' prop -->
        <div v-if="props.show" class="rsvp-modal-overlay" @click.self="emitClose">
            <div class="rsvp-modal-card">
                <button class="modal-close-btn" @click="emitClose" aria-label="Close modal">&times;</button>

                <div class="modal-header">
                    <!-- <span class="modal-sub-label">R.S.V.P.</span> -->
                    <h2 class="modal-title">Join An Exclusive Evening</h2>
                    <p class="modal-description">Your Presence means everything. Share your details to confirm.</p>
                </div>

                <form class="rsvp-form" @submit.prevent="handleRSVPSubmit">
                    <div class="form-group">
                        <input type="text" id="name" required placeholder=" " class="luxury-input" />
                        <label for="name" class="luxury-label">Full Name</label>
                    </div>

                    <div class="form-group">
                        <input type="tel" id="phoneno" required placeholder=" " class="luxury-input" />
                        <label for="phoneno" class="luxury-label">Phone Number</label>
                    </div>

                    <div class="form-group">
                        <select id="guests" class="luxury-input luxury-select">
                            <option value="null" selected disabled>Pick Option</option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                        </select>
                        <label for="guests" class="luxury-label">Do you have any seafood allegries?</label>
                    </div>

                    <div class="modal-action">
                        <button type="submit" class="rsvp-submit-button">
                            <span>Confirm Attendance</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>


<style>
/* --- 1. Main Modal Backdrop Overlay --- */
.rsvp-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(34, 31, 26, 0.4);
    /* Elegant warm charcoal tint */
    backdrop-filter: blur(10px);
    /* Premium smooth glass blur */
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    /* Forces it over maps, carousels, and headers */
    box-sizing: border-box;
}

/* --- 2. The Premium Invitation Card --- */
.rsvp-modal-card {
    /* background-color: #f4ede1; */
    background-color: rgba(197, 122, 9, 0.3);
    /* Reuses your exact premium background tone */
    max-width: 450px;
    width: 90%;
    /* Responsive padding constraint for mobile screens */
    padding: 4rem 2.5rem 3.5rem 2.5rem;
    border-radius: 14px;
    border: 1px solid #e1dbcf;
    box-shadow: 0 30px 70px rgba(17, 17, 17, 0.15);
    position: relative;
    text-align: center;
    box-sizing: border-box;
}

/* Minimalist Close Custom Sign */
.modal-close-btn {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    font-size: 2rem;
    font-weight: 200;
    color: #8b8577;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    transition: color 0.2s ease;
}

.modal-close-btn:hover {
    color: #111;
}

/* --- 3. Header Typography Layout --- */
.modal-header {
    margin-bottom: 3.5rem;
}

.modal-sub-label {
    font-family: 'Arial', sans-serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: #8b8577;
    display: block;
    margin-bottom: 0.6rem;
}

.modal-title {
    font-family: 'Georgia', serif;
    font-weight: 300;
    font-size: 1.8rem;
    color: #ffffff;
    /* color: #111; */
    margin: 0 0 0.8rem 0;
}

.modal-description {
    font-family: 'Arial', sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: #f3f3f3;
    /* color: #666; */
    margin: 0;
}

/* --- 4. Custom Registry-Style Floating Forms --- */
.rsvp-form {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    /* Spacious distance between individual inputs */
}

.form-group {
    position: relative;
    text-align: left;
    display: flex;
    flex-direction: column-reverse;
    /* Allows native input placeholder trickery */
}

/* Strips away raw web input box grids entirely */
.luxury-input {
    width: 100%;
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid #dcd7ca !important;
    /* Single ultra-thin underline divider */
    padding: 0.6rem 0;
    font-family: 'Georgia', serif;
    font-size: 1.1rem;
    color: #e3e3e3;
    /* color: #111; */
    outline: none;
    border-radius: 0 !important;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
}

.luxury-input:focus {
    border-bottom: 1px solid rgba(244, 108, 69, .5) !important;
    /* border-bottom: 1px solid #111 !important; */
}

/* Clean Custom Arrow Wrapper for Selection Dropdown */
.luxury-select {
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%238b8577' stroke-width='2' viewBox='0 0 24 24'><polyline points='6 9 12 15 18 9'></polyline></svg>");
    background-repeat: no-repeat;
    background-position: right cubic-bezier(0.25, 1, 0.5, 1) center;
    padding-right: 1.5rem;
    font-size: 11pt;
}

/* The Label Styling */
.luxury-label {
    font-family: 'Arial', sans-serif;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #f1f1f1;
    /* color: #8b8577; */
    margin-bottom: 0.4rem;
    transition: color 0.3s ease;
}

.luxury-input:focus~.luxury-label {
    /* color: #111; */
    color: white;
}

/* --- 5. Premium Dark Solid Submit Action --- */
.modal-action {
    margin-top: 1rem;
}

.rsvp-submit-button {
    background-color: rgb(244, 108, 69);
    /* background-color: rgb(235, 47, 115); */
    /* background-color: #111; */
    color: #fff;
    border: none;
    width: 100%;
    padding: 1.1rem;
    font-family: 'Arial', sans-serif;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.rsvp-submit-button:hover {
    background-color: #2b2721;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* --- 6. Vue Animation System Transitions --- */
.fade-luxury-enter-active,
.fade-luxury-leave-active {
    transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.fade-luxury-enter-active .rsvp-modal-card,
.fade-luxury-leave-active .rsvp-modal-card {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
}

.fade-luxury-enter-from,
.fade-luxury-leave-to {
    opacity: 0;
}

.fade-luxury-enter-from .rsvp-modal-card {
    transform: translateY(30px);
    opacity: 0;
}

.fade-luxury-leave-to .rsvp-modal-card {
    transform: translateY(-15px);
    opacity: 0;
}
</style>
<!-- <style>
.fade-luxury-enter-active,
.fade-luxury-leave-active {
    transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.fade-luxury-enter-active .rsvp-modal-card,
.fade-luxury-leave-active .rsvp-modal-card {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
}

.fade-luxury-enter-from,
.fade-luxury-leave-to {
    opacity: 0;
}

.fade-luxury-enter-from .rsvp-modal-card {
    transform: translateY(20px);
    opacity: 0;
}

.fade-luxury-leave-to .rsvp-modal-card {
    transform: translateY(-10px);
    opacity: 0;
}

.rsvp-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(34, 31, 26, 0.4);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
</style> -->