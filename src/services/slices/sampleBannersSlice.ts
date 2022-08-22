import { createSlice } from '@reduxjs/toolkit';

import { TSampleBanners } from '../../types/data';
import { asyncThunkFactory } from '../thunks/thunks';

interface ISampleBannersState {
  list: Array<TSampleBanners>;
  isLoading: boolean;
  error: string | undefined;
  isModalShown: boolean;
}

const initialState: ISampleBannersState = {
  list: [],
  isLoading: false,
  error: undefined,
  isModalShown: true,
};

export const fetchSampleBanners = asyncThunkFactory<TSampleBanners>(
  'sample-banners/fetchSampleBanners'
);

const sampleBannersSlice = createSlice({
  name: 'sample-banners',
  initialState,
  reducers: {
    closeBanner: (state) => {
      state.isModalShown = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSampleBanners.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchSampleBanners.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.list.push(...action.payload);
        }
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchSampleBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
        state.error = action.payload;
      });
  },
});

export const { closeBanner } = sampleBannersSlice.actions;

export default sampleBannersSlice.reducer;
