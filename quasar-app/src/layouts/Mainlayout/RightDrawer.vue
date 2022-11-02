<template>
  <q-drawer
     v-model="drawerRight"
     :width="200"
     side="right"
     behavior="desktop">
      123
   </q-drawer>
</template>
<script setup>
import { inject } from 'vue';

const drawerRight = inject('drawerRight');

</script>
