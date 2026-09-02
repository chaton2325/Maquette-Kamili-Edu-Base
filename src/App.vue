<script setup>
import PhoneFrame from '@/components/shell/PhoneFrame.vue'
import TourOverlay from '@/components/tour/TourOverlay.vue'
</script>

<template>
  <PhoneFrame>
    <RouterView />
  </PhoneFrame>
  <TourOverlay />
</template>
