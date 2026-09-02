<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'

const props = defineProps({
  labels: { type: Array, required: true },
  values: { type: Array, required: true },
  color: { type: String, default: '#0f766e' },
  height: { type: Number, default: 180 },
  suffix: { type: String, default: '' },
  horizontal: { type: Boolean, default: false }
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{ data: props.values, backgroundColor: props.color, borderRadius: 6, maxBarThickness: 28 }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: props.horizontal ? 'y' : 'x',
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (ctx) => `${ctx.formattedValue}${props.suffix}` } }
  },
  scales: {
    x: { grid: { display: !props.horizontal, color: '#eef0f2' }, ticks: { font: { size: 10 }, color: '#5c6a7a' } },
    y: { grid: { display: props.horizontal, color: '#eef0f2' }, ticks: { font: { size: 10 }, color: '#5c6a7a' }, beginAtZero: true }
  }
}))
</script>

<template>
  <div :style="{ height: `${height}px` }">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
