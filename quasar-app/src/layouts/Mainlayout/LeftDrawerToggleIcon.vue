<template>
  <q-btn :icon="icon" @click="onClick()" flat dense></q-btn>
</template>
<script setup>
import { computed, inject } from 'vue';

const drawerLeft = inject('drawerLeft');
const onClick = () => { drawerLeft.value = !drawerLeft.value; };
const icon = computed(() => {
  if (drawerLeft.value) return 'mdi-chevron-double-left';
  return 'mdi-chevron-double-right';
});
</script>
