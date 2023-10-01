/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  id: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.id = payload.id;
    },
    hideModal: (state) => {
      state.type = null;
      state.id = null;
    },

  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
