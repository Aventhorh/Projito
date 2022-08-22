import { createSlice } from '@reduxjs/toolkit';

import { TNews } from '../../types/data';
import { asyncThunkFactory } from '../thunks/thunks';

interface INewsState {
  list: Array<TNews>;
  isLoading: boolean;
  error: string | undefined;
  links: {
    first: string;
    prev?: string;
    next?: string;
    last: string;
  }
}

const initialState: INewsState = {
  list: [],
  isLoading: false,
  error: undefined,
  links: {
    first: '',
    prev: '',
    next: '',
    last: '',
  },
};

export const fetchNews = asyncThunkFactory<TNews>(
  'news/fetchNews'
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const {payload} = action;
        if (!Array.isArray(payload)) {
          state.list.push(...payload.data);
          state.links = {...payload.linkHeaderObject}
        } 
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
