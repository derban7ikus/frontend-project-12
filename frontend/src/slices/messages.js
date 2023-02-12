import {
  createSlice,
} from '@reduxjs/toolkit';
import channels, { actions as channelsSlice } from "./channels.js"


const slice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload.message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsSlice.createInitialState, (state, action) => {
      const { messages } = action.payload;
      state.messages = messages;
    })
      .addCase(channelsSlice.removeChannel, (state, action) => {
        const { id } = action.payload.id;
        const newMessages = state.messages.filter((message) => message.id !== id);
        state.messages = newMessages;
      })
  }
});

export const { actions } = slice;

export default slice.reducer;