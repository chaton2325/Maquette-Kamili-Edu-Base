<script setup>
</script>

<template>
  <div id="device-viewport" class="app-viewport">
    <div class="scroll-content no-scrollbar">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-viewport {
  height: 100vh;
  height: 100dvh;
  position: relative;
  background: #eef2f4;
}

.scroll-content {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
