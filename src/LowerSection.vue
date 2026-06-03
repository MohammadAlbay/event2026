<script setup lang="ts">
import { ref, computed } from 'vue'
const lat = ref(32.8822813)
const lng = ref(13.2111231)

const embedUrl = computed(() => {
    return 'src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.5113941400615!2d13.2085482!3d32.8822813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a892f053566da7%3A0x7662e48d832a1731!2sV6J6%2BVFR%2C%20Tarabulus!5e0!3m2!1sen!2sly!4v1717315200000!5m2!1sen!2sly"'
})
</script>
<template>
    <section>
        <div class="bottom-map-section">
            <div class="map-header">
                <h2 class="map-title">Getting There</h2>
                <p class="map-subtitle">La Porta Di Roma HQ, Tarabulus</p>
            </div>

            <div class="map-card-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.5113941400615!2d13.2085482!3d32.8822813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a892f053566da7%3A0x7662e48d832a1731!2sV6J6%2BVFR%2C%20Tarabulus!5e0!3m2!1sen!2sly!4v1717315200000!5m2!1sen!2sly"
                    width="100%" height="350" style="border:0;" allowfullscreen="false" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </section>

    <footer class="designer-credit-footer">
        <div class="credit-content">
            <span class="credit-prefix">Designed & Developed by</span>
            <a href="https://linkedin.com/in/mohammad-albay-44a477317" target="_blank" rel="noopener noreferrer"
                class="credit-link">
                Mohammad Albay
            </a>
        </div>
    </footer>
</template>

<style>
/* .bottom-map-section {
    margin-top: 5rem;
    padding: 3rem 1.5rem;
    background-color: rgba(212, 198, 161, 0.15);
    border-top: 1px solid #e1dbcf;
    text-align: center;
} */
@media only screen and (max-width: 500px) {
    .map-card-container {
        width: 100%;
    }
}

.bottom-map-section {
    margin-top: 2.5rem;
    padding: 2rem 1rem 3rem 1rem;
    background-color: rgba(212, 198, 161, 0.12);
    border-top: 1px solid #e1dbcf;
    text-align: center;
}

.map-card-container {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    border: 1px solid #e1dbcf;
}

.map-title {
    font-family: 'Georgia', serif;
    font-weight: 300;
    font-size: 1.6rem;
    margin: 0 0 0.3rem 0;
    color: #111;
}

.map-subtitle {
    font-family: 'Arial', sans-serif;
    font-size: 0.85rem;
    color: #666;
    margin: 0 0 1.25rem 0;
    /* margin: 0 0 2rem 0; */
}

.map-card-container {
    max-width: 500px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
    border: 1px solid #e1dbcf;
}
</style>

<style>
.designer-credit-footer {
    width: 100%;
    padding: 2rem 1rem 3rem 1rem;
    /* Generous bottom spacing for mobile browsers */
    text-align: center;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}

.credit-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
}

.credit-prefix {
    font-family: 'Arial', sans-serif;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #8b8577;
    /* Subtle matching tone */
}

.credit-link {
    font-family: 'Georgia', serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: #333;
    text-decoration: none;
    letter-spacing: 0.05em;
    padding: 0.2rem 0;
    display: inline-flex;
    align-items: center;
    transition: color 0.3s ease;
}


/* Luxury hover interaction */
.credit-link:hover {
    color: #bcae97;
    /* Fades to the accent champagne color on hover */
}
</style>