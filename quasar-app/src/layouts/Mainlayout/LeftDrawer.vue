<template>
   <q-drawer
      v-model="drawerLeft"
      class="bg-grey-1"
      :width="200"
      behavior="desktop">
      <q-scroll-area class="fit">
        <q-item clickable class="leftDrawerItem">
          <q-item-section>EMMMM</q-item-section>
          <q-item-section side>
            <LeftDrawerToggleIcon/>
          </q-item-section>
        </q-item>
        <q-item clickable dense class="q-py-none" to="/editor">
          <q-item-section avatar>
            <q-icon name="mdi-magnify" size="18px"></q-icon>
          </q-item-section>
          <q-item-section>
            title
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </q-drawer>
</template>
<script setup>
import { inject } from 'vue';
import LeftDrawerToggleIcon from './LeftDrawerToggleIcon.vue';

const drawerLeft = inject('drawerLeft');

</script>
