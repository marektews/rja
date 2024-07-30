<template>
    <div>
        <label class="form-label">
            Nazwa zboru
        </label>

        <select class="form-select" v-model="selected">
            <option
                v-for="(item, index) in zbory" :key="index"
                :value="item"
            >
                {{ item.name }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const selected = ref(undefined)
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const zbory = computed(() => {
    let res = store.state.congregations.filter(() => true)
    res.sort((a,b) => {
        return a.name.localeCompare(b.name)
    })
    return res
})

watch(selected, (nv) => emit('update:modelValue', nv))
</script>
