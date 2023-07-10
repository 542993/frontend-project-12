import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: [],
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setChannels(state, {payload}) {
            state.messages = payload;
        }
    }
})
export default messagesSlice.reducer;
export const { actions } = messagesSlice;