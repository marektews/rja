<template>
    <div class="d-flex flex-column align-items-center mt-4">
        <h6 class="mb-3">Wybierz terminal</h6>
        <div class="d-flex gap-2 flex-wrap justify-content-center">
            <button
                v-for="terminal in store.state.terminals"
                :key="terminal.tid"
                class="btn btn-primary"
                @click="selectTerminal(terminal)"
            >
                <FontAwesomeIcon :icon="faBus" class="me-2" />
                {{ terminal.name }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBus } from '@fortawesome/free-solid-svg-icons'

const store = useStore()

function selectTerminal(terminal) {
    store.dispatch('loadSectors', terminal.tid)
}
</script>
