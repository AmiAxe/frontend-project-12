/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.addMany,
    addChannel: (state, action) => {
      const { id, name, creatorId } = action.payload;
      channelsAdapter.addOne(state, { id, name, creatorId });
      state.currentChannelId = id;
    },
    updateChannel: channelsAdapter.updateOne,
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action);
      state.currentChannelId = 1;
    },
    setCurrentChannelId: (state, { payload }) => {
      const { channelId } = payload;
      state.currentChannelId = channelId;
    },
  },
});

export const {
  setChannels,
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannelId,
} = channelsSlice.actions;

export const channelsSelector = channelsAdapter.getSelectors((state) => state.channelsReducer);

export default channelsSlice.reducer;
