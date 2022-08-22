import { createSlice } from '@reduxjs/toolkit';

import { TJournalCard } from '../../types/data';
import { asyncThunkFactory } from '../thunks/thunks';

interface IJournalState {
  list: Array<TJournalCard>;
  isLoading: boolean;
  error: string | undefined;
  links: {
    first: string;
    prev?: string;
    next?: string;
    last: string;
  }
}

const initialState: IJournalState = {
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

export const fetchJournals = asyncThunkFactory<TJournalCard>(
  'journals/fetchJournals'
);

const journalSlice = createSlice({
  name: 'journals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJournals.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchJournals.fulfilled, (state, action) => {
        const {payload} = action;
        if (!Array.isArray(payload)) {
          state.list.push(...payload.data);
          state.links = {...payload.linkHeaderObject}
        } 
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchJournals.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
        state.error = action.payload;
      });
  },
});

export default journalSlice.reducer;
