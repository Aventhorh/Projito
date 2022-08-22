import { createSlice } from '@reduxjs/toolkit';

import { TSpecialProject } from '../../types/data';
import { asyncThunkFactory } from '../thunks/thunks';

interface ISpecialProjectsState {
  list: Array<TSpecialProject>;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ISpecialProjectsState = {
  list: [],
  isLoading: false,
  error: undefined,
};

export const fetchSpecialProjects = asyncThunkFactory<TSpecialProject>(
  'special-projects/fetchSpecialProjects'
);

const specialProjectsSlice = createSlice({
  name: 'special-projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialProjects.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchSpecialProjects.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.list.push(...action.payload);
        }
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchSpecialProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
        state.error = action.payload;
      });
  },
});

export default specialProjectsSlice.reducer;
