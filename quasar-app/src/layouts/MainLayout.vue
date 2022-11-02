<template>
  <q-layout view="lHh LpR fFf">
    <AppHeader />

    <LeftDrawer />
    <RightDrawer />

    <q-page-container>
      <q-page :style-fn="(offset,height) => ({ height: `${height-offset}px` })">
        <q-scroll-area class="absolute-full">
          <router-view />
        </q-scroll-area>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { useAppStore } from 'stores/app';
import LeftDrawer from './Mainlayout/LeftDrawer.vue';
import RightDrawer from './Mainlayout/RightDrawer.vue';
import AppHeader from './Mainlayout/AppHeader.vue';

const $app = useAppStore();
const drawerLeft = ref(true);
const drawerRight = ref(true);
provide('drawerLeft', drawerLeft);
provide('drawerRight', drawerRight);

</script>

<style lang="scss">
  .leftDrawerItem {
    &:hover {·
      .q-icon {
        display: block;
      }
    }
    .q-icon {
      display: none;
    }
  }
</style>
