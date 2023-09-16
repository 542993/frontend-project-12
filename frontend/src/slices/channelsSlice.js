import { createSlice, createAsyncThunk, createEntityAdapter, current } from '@reduxjs/toolkit';
import axios from 'axios';
import routesAPI from '../routes';
import getAuthHeader from '../utils';

export const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    console.log('kkk');
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
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.upsertOne,
    removeChannel: (state, { payload }) => {
      console.log('state channels', console.log(current(state)));
      channelsAdapter.removeOne(state, { payload });
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
console.log('initial', initialState);
console.log('chanelsadapter', channelsAdapter);
console.log(channelsSlice);
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
console.log('selectors', selectors);
export const { addChannel,
  renameChannel,
  removeChannel,
  setCurrentChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
