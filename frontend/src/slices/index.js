import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice.js';

const store = configureStore({
  reducer: {
    channels,
  },
});
console.log(store);
export default store;
