<template>
    <div class="container">
        <h4 class="mb-4">
            <FontAwesomeIcon :icon="faCircleInfo" class="me-2"/>
            Rozkłady jazdy autokarów
        </h4>

        <TerminalsView v-if="mode === 1" />
        <RozkladyView v-else-if="mode === 2" />
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
const mode = ref(0)

onBeforeMount(() => {
    store.dispatch('loadCongregations')
    store.dispatch('loadSRA')
    loadTerminals()
})

function loadTerminals() {
    fetch("/api/rja/terminals")
    .then((resp) => {
        if(resp.status === 200)
            return resp.json()
        else
            throw resp
    })
    .then((data) => {
        console.log("Load terminals:", data)
        store.commit('setTerminals', data)
        if(data.length > 1)
            mode.value = 1
        else
        if(data.length === 1) {
            loadSectors(data[0].tid)
        }
    })
    .catch((reason) => {
        console.error("Load terminals:", reason)
    })
}

function loadSectors(tid) {
    fetch(`/api/rja/sectors/${tid}`)
    .then(resp => {
        if(resp.status === 200)
            return resp.json()
        else
            throw resp
    })
    .then(data => {
        console.log("Load sectors:", data)
        store.commit('setSectors', data)
        mode.value = 2
    })
    .catch((reason) => {
        console.error("Load sectors:", reason)
    })
}

</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>
