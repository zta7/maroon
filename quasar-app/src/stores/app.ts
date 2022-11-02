import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    socketIo: {
      // active: false,
      // suspend: false,
    },
  }),
});
