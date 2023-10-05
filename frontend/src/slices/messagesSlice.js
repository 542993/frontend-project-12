/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      // Выбираем все комментарии кроме тех, что нужно удалить
      const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
      // setAll удаляет текущие сущности и добавляет новые
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
