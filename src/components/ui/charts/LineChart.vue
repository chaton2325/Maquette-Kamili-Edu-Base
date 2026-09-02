<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

const props = defineProps({
  labels: { type: Array, required: true },
  values: { type: Array, required: true },
  color: { type: String, default: '#0f766e' },
  height: { type: Number, default: 180 },
  suffix: { type: String, default: '' }
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      borderColor: props.color,
      backgroundColor: `${props.color}22`,
      fill: true,
      tension: 0.35,
      pointRadius: 3,
      pointBackgroundColor: props.color
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { callbacks: { label: (ctx) => `${ctx.formattedValue}${props.suffix}` } }
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#5c6a7a' } },
    y: { grid: { color: '#eef0f2' }, ticks: { font: { size: 10 }, color: '#5c6a7a' } }
  }
}))
</script>

<template>
  <div :style="{ height: `${height}px` }">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
