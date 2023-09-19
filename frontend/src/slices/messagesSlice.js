/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      });
  },
});
console.log(messagesSlice.actions);

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
