<template>
    <div>
        <div class="d-flex justify-content-center align-items-center">
            <div class="btn-group">
                <template v-for="(sector, idx) in store.state.sectors" :key="idx">
                    <input 
                        type="radio" 
                        class="btn-check" 
                        name="btnradio" 
                        :id="`btnradio${idx}`" 
                        autocomplete="off" 
                        :value="sector"
                        v-model="current_sector"
                    >
                    <label 
                        class="btn btn-primary" 
                        :for="`btnradio${idx}`"
                    >
                        &nbsp;{{ sector.name.split(' ')[1] }}&nbsp;
                    </label>
                </template>
            </div>
        </div>

        <RJATable v-if="current_sector" :sector="current_sector" />

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import RJATable from '@/components/RJATable.vue';

const store = useStore()
const current_sector = ref(undefined)

</script>

<style lang="scss" scoped>
.my-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2pt 9pt;
}
</style>