<template>
  <div :class="`bg-gray-200 w-full rounded-lg animate-pulse h-${height}`"></div>
</template>

<script setup>
defineProps({
  height: {
    type: String,
    default: '12'
  }
})
</script>
