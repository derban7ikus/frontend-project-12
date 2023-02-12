import {
  createSlice,
} from '@reduxjs/toolkit';

const defaultChannelId = 1;

const slice = createSlice({
  name: 'channels',
  initialState: { channels: [], currentChannelId: defaultChannelId },
  reducers: {
    createInitialState(state, { payload }) {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    },
    changeChannel(state, { payload }) {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
    addChannel(state, { payload }) {
      const { channel } = payload
      state.channels.push(channel);
    },
    removeChannel(state, { payload }) {
      const { id } = payload.id;
      const newChannels = state.channels.filter((channel) => channel.id !== id);
      state.channels = newChannels;
      state.currentChannelId = defaultChannelId;
    },
    renameChannel(state, { payload }) {
      console.log(payload);
      const { id } = payload;
      const { name } = payload;
      console.log(id, name);
      const unrenamedChannel = state.channels.find((channel) => id === channel.id);
      unrenamedChannel.name = name;
    }
  },
});

export const { actions } = slice;

export default slice.reducer;