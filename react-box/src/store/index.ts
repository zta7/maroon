import { configureStore } from '@reduxjs/toolkit';
import layout from './layout';

export const store = configureStore({
  reducer: {
    layout,
  },
});
