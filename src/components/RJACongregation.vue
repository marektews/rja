<template>
    <div 
        v-if="rja_data" 
        class="info-cnt mt-4"
    >
        <div v-if="rja_data.length === 0" class="alert alert-danger">
            <FontAwesomeIcon :icon="faCircleExclamation" class="me-2"/>
            Zbór nie zarejestrował żadnego autokaru
        </div>
        <template v-else>
            <h6>
                Liczba autokarów: {{ rja_data.length }}
            </h6>
            <div class="autokary-lista">
                <div 
                    v-for="(rja, index) in rja_data" :key="index"
                    class="card"
                >
                    <div class="card-body rja-item-cnt">
                    <h5 class="all-row">
                        Autokar nr {{ index + 1 }}
                    </h5>

                    <div class="text-muted">Sektor:</div>
                    <div>{{ rja.sector }}</div>
                    
                    <div class="text-muted">Identyfikator:</div>
                    <div>{{ rja.ident }}</div>

                    <h5 class="all-row mt-3">
                        Odjazdy:
                    </h5>

                    <div class="text-muted">Piątek:</div>
                    <div>{{ rja.d1 }}</div>

                    <div class="text-muted">Sobota:</div>
                    <div>{{ rja.d2 }}</div>

                    <div class="text-muted">Niedziela:</div>
                    <div>{{ rja.d3 }}</div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const store = useStore()
const props = defineProps({
    congregation: { type: Object, required: true },
})

const rja_data = ref(undefined)

watch(() => props.congregation, async (nv) => {
    rja_data.value = undefined

    const zbor = store.state.congregations.find((elem) => elem.name === nv.name)
    console.log("zbor:", zbor)
    
    const resp = await fetch(`/api/rja/zbor/${zbor.id}`)
    if(resp.status === 200) {
        const data = await resp.json()
        console.log("Load congregation rja:", data)
        rja_data.value = data
    }
    else {
        console.error("Load congregation rja:", resp)
    }
})

</script>

<style scoped>
.info-cnt {
    display: flex;
    flex-direction: column;
    gap: 12pt;
}

.rja-item-cnt {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2pt 8pt;
}

.autokary-lista {
    display: flex;
    flex-direction: row;
    gap: 14pt;
    justify-content: space-around;
}

.all-row {
    grid-column-start: 1;
    grid-column-end: 3;
}
</style>