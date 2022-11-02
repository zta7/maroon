<template>
    <q-btn-group flat class="q-gutter-x-sm">
      <q-btn icon="mdi-comment-text-outline" flat dense @click="drawerRight=!drawerRight"></q-btn>
      <q-btn icon="mdi-clock-outline" flat dense></q-btn>
      <q-btn icon="mdi-dots-horizontal" flat dense></q-btn>
    </q-btn-group>
</template>
<script setup>
import { inject } from 'vue';

const drawerRight = inject('drawerRight');
</script>
