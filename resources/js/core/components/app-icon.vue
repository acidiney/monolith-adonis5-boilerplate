<script setup>
import VFeather from 'vue-feather'
defineProps({
  icon: String,
  size: Number
})
</script>

<template>
    <v-feather
    v-bind="{
      type: icon,
      size,
    }"
  />
</template>

