<template>
    <div v-if="loading" class="mt-5 d-flex justify-content-center align-items-center">
        <div class="d-flex align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="ms-3">
                Proszę czekać, trwa pobieranie danych.
            </div>
        </div>
    </div>
    <div v-else-if="error" class="mt-5 alert alert-danger">
        Nie udało się pobrać rozkładu dla tego sektora.
    </div>
    <div v-else-if="Busses.length === 0" class="mt-5 alert alert-secondary">
        Brak autokarów na tym sektorze.
    </div>
    <div v-else class="mt-5 rja-grid">
        <div class="rja-cell rja-head rja-lp">Lp</div>
        <div class="rja-cell rja-head">Zbór</div>
        <div class="rja-cell rja-head rja-dep">Odjazd</div>

        <template v-for="(item, index) in Busses" :key="index">
            <div class="rja-cell rja-lp" :class="{ 'rja-alt': index % 2 }">{{ item.tura }}</div>
            <div class="rja-cell rja-name" :class="{ 'rja-alt': index % 2 }">{{ item.name }}</div>
            <div class="rja-cell rja-dep" :class="{ 'rja-alt': index % 2 }">{{ item.departure || '—' }}</div>
        </template>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
    sector: { type: Object, required: true },
})

const store = useStore()
const rja = ref([])
const loading = ref(true)
const error = ref(false)
const Busses = computed(() => {
    let res = []
    rja.value.forEach((elem) => {
        let sra = store.state.sra.find((sra_item) => sra_item.id === elem.sra_id)
        let zbor = store.state.congregations.find((congr) => congr.id === sra?.congregation_id)
        if(!sra || !zbor) return   // pomiń, jeśli brak powiązanych danych

        // identyfikator jak w backendzie (db.CreateShortBusID): static_identifier albo nazwaSektora + sectorOrder
        const ident = sra.static_identifier || `${props.sector.name}${elem.sector_order}`
        const base = sra.lp ? `${zbor.name} ${sra.lp}` : zbor.name
        const name = ident ? `${ident} - ${base}` : base

        res.push({ tura: elem.sector_order, departure: elem.d1, name })
    })
    res.sort((a, b) => a.tura - b.tura)
    return res
})

onMounted(() => {
    loadSectorBusses(props.sector.sid)
})

watch(() => props.sector, (nv) => {
    rja.value = []
    console.log("watch:", nv)
    loadSectorBusses(nv.sid)
})

function loadSectorBusses(sid) {
    loading.value = true
    error.value = false
    fetch(`/api/rja/buses/${sid}/${store.state.active_tura.tid}`)
    .then(resp => {
        if(resp.status === 200)
            return resp.json()
        else
            throw resp
    })
    .then(data => {
        console.log("load sector busses:", data)
        rja.value = data
    })
    .catch(reason => {
        console.error("load sector busses:", reason)
        rja.value = []
        error.value = true
    })
    .finally(() => {
        loading.value = false
    })
}
</script>

<style scoped>
.rja-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    border: 1px solid var(--bs-border-color);
    border-radius: .6rem;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
}

.rja-cell {
    display: flex;
    align-items: center;
    padding: .55rem .9rem;
    border-bottom: 1px solid var(--bs-border-color);
}

/* ostatni wiersz bez dolnej linii */
.rja-grid > .rja-cell:nth-last-child(-n + 3) {
    border-bottom: 0;
}

.rja-head {
    font-size: .78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .04em;
    color: var(--bs-secondary-color);
    background: var(--bs-secondary-bg);
    border-bottom-width: 2px;
}

/* naprzemienne tło wierszy (zebra) */
.rja-alt {
    background: var(--bs-tertiary-bg);
}

.rja-lp {
    justify-content: center;
    color: var(--bs-secondary-color);
    font-variant-numeric: tabular-nums;
}

.rja-name {
    font-weight: 500;
}

.rja-dep {
    justify-content: flex-end;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
}
</style>