import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice.js';
import messages from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channels,
    messages,
  },
});
console.log('store', store);
export default store;
