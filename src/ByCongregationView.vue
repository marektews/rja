<template>
    <div>
        <SelectCongregation v-model="congregation" />
        <RJACongregation :congregation="congregation" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectCongregation from '@/components/SelectCongregation.vue'
import RJACongregation from './components/RJACongregation.vue'

const congregation = ref({})
</script>

