import { createSlice } from '@reduxjs/toolkit';

import { TSearchBanner } from '../../types/data';
import { asyncThunkFactory } from '../thunks/thunks';

interface ISearchBannerState {
  list: Array<TSearchBanner>;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ISearchBannerState = {
  list: [],
  isLoading: false,
  error: undefined,
};

export const fetchSearchBanner = asyncThunkFactory<TSearchBanner>(
  'search-banner/fetchSearchBanner'
);

const searchBannerSlice = createSlice({
  name: 'search-banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchBanner.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchSearchBanner.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.list.push(...action.payload);
        }
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchSearchBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
        state.error = action.payload;
      });
  },
});

export default searchBannerSlice.reducer;
