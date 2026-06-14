<template>
    <div class="container">
        <h4 class="mb-4">
            <FontAwesomeIcon :icon="faCircleInfo" class="me-2"/>
            Rozkłady jazdy autokarów
        </h4>

        <TerminalsView v-if="store.state.mode === 1" />
        <RozkladyView v-else-if="store.state.mode === 2" />
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import RozkladyView from './RozkladyView.vue';
import TerminalsView from './TerminalsView.vue';

const store = useStore()

onBeforeMount(() => {
    store.dispatch('loadActiveTura')
})

</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>
