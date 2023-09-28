import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routesAPI from '../routes';
import getAuthHeader from '../utils';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(routesAPI.dataPath(), { headers: getAuthHeader() });
    console.log('response', response.data);
    return response.data;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsAdapter.addMany(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      })

      .addCase(fetchData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },

});
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
