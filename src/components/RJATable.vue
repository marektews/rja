<template>
    <div v-if="rja.length === 0" class="mt-5 d-flex justify-content-center align-items-center">
        <div class="d-flex align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="ms-3">
                Proszę czekać, trwa pobieranie danych.
            </div>
        </div>
    </div>
    <div v-else class="mt-5 my-grid">
        <div>Lp</div>
        <div>Zbór</div>
        <div>Odjazd</div>

        <template v-for="(item, index) in Busses" :key="index">
            <div>{{ item.tura }}</div>
            <div>{{ item.name }}</div>
            <div>{{ item.departure }}</div>
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
const Busses = computed(() => {
    let res = []
    rja.value.forEach((elem) => {
        let sra = store.state.sra.find((sra_item) => sra_item.id === elem.sra_id)
        let zbor = store.state.congregations.find((congr) => congr.id  === sra.zbor_id)

        let ident = ""
        if(sra.static_identifier)
            ident = sra.static_identifier
        else
            ident = sra.prefix + elem.tura + props.sector.name.split(' ')[1]

        let name = ""
        if(sra.lp) 
            name = `${ident} - ${zbor.name} ${sra.lp}`
        else
            name = `${ident} - ${zbor.name}`

        let item = { tura: elem.tura }
        item.departure = elem.d1
        item.name = name
        res.push(item)
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
    fetch(`/api/rja/buses/${sid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tura: store.getters.tura })
    })
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
    })
}
</script>