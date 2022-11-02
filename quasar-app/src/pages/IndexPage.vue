<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="onSocketEmit()">emit hello</q-btn>
    <q-card>
      <q-card-section>Listen</q-card-section>
      <q-card-section>{{ data }}</q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { socket } from 'boot/socket-io';
import { ref } from 'vue';

const data = ref('');
const onSocketEmit = () => {
  socket.emit('hello', 'daemon', (res: unknown) => console.log(res));
};
</script>
