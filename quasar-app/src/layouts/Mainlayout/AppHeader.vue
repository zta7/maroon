<template>
  <q-header style="color: inherit; background-color: inherit">
    <q-item class="fit q-px-none">
      <q-item-section side>
        <LeftDrawerToggleIcon v-if='!drawerLeft'/>
      </q-item-section>
      <q-space />
      <q-item-section side>
        <RightHeaderBar />
      </q-item-section>
    </q-item>
  </q-header>
</template>
<script setup>
import { inject } from 'vue';
import LeftDrawerToggleIcon from './LeftDrawerToggleIcon.vue';
import RightHeaderBar from './RightHeaderBar.vue';

const drawerLeft = inject('drawerLeft');
</script>
