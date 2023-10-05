import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  error: null,
});
/* eslint no-param-reassign: "error" */
const defaultChannelId = 1;
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.upsertOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = defaultChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  setChannels,
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
