import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice.js';
import messages from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channels,
    messages,
  },
});
export default store;
