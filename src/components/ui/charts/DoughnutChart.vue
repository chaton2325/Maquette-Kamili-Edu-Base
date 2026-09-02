<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'

const props = defineProps({
  labels: { type: Array, required: true },
  values: { type: Array, required: true },
  colors: { type: Array, default: () => ['#0f766e', '#3fc7b7', '#fcd116', '#ce1126', '#94a3b8'] },
  height: { type: Number, default: 180 }
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{ data: props.values, backgroundColor: props.colors, borderWidth: 0 }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
  plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, color: '#465262' } } }
}
</script>

<template>
  <div :style="{ height: `${height}px` }">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
