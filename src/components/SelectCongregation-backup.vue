<template>
    <div>
        <label class="form-label">
            Nazwa zboru
        </label>

        <input 
            v-model="name"
            type="text" 
            class="form-control form-select-lg"
            list="hints"
            placeholder="Wpisz 3 znaki i poczekaj chwilkę"
            title="Wpisz 3 znaki i poczekaj chwilkę, aż pojawi się lista podpowiedzi ułatwiająca wybór nazwy zboru"
        />
        <small>
            Wpisz 3 znaki i poczekaj chwilkę, aż pojawi się lista podpowiedzi ułatwiająca wybór nazwy zboru
        </small>

        <datalist id="hints">
            <option v-for="(item, index) in hints" :key="index" 
                :value="item.name"
            />
        </datalist>       
    </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const name = ref("")
const hints = ref([])
const ops = ref(null)

// const name = computed({
//     get() {
//         return props.modelValue
//     },
//     set(value) {
//         emit('update:modelValue', value)
//         isFinished(value)
//     }
// })

const props = defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (nv) => name.value = nv)

watch(name, (value, old) => {
    console.log("Watcher:", value, old)
    if(value.length < 3) {
        hints.value = []
        return
    }

    if(hints.value.length === 1 && hints.value[0].name === value) {
        emit('update:modelValue', name.value)
    }
    else
    if(Math.abs(value.length - old.length) === 1) {
        if(ops.value) clearTimeout(ops.value)
        ops.value = setTimeout(() => {
            clearTimeout(ops.value)
            ops.value = null
            getHints()
        }, 800)
    }
})

function getHints() {
    hints.value = store.state.congregations.filter((value) => value.name.toLowerCase().includes(name.value.toLowerCase()))
    console.log("getHints:", hints.value)    
}

onBeforeUnmount(() => {
    if(ops.value) clearTimeout(ops.value)
})

// function isFinished(value) {
//     let b = hints.value.length == 1 && hints.value.includes(value)
//     emit('finished', b)
// }
</script>
