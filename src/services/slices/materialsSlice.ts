import { createSlice } from '@reduxjs/toolkit';

import { TMaterials } from '../../types/data';
import { asyncThunkFactory } from '../thunks/thunks';

interface IMaterialsState {
  list: Array<TMaterials>;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IMaterialsState = {
  list: [],
  isLoading: false,
  error: undefined,
};

export const fetchMaterials = asyncThunkFactory<TMaterials>(
  'materials/fetchMaterials'
);

const materialSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.list.push(...action.payload);
        }
        state.isLoading = false;
        state.error = undefined;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.list = [];
        state.error = action.payload;
      });
  },
});

export default materialSlice.reducer;
