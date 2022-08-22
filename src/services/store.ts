import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import sampleBannersReducer from './slices/sampleBannersSlice';
import searchBannerReducer from './slices/searchBannerSlice';
import journalReducer from './slices/journalSlice';
import newsReducer from './slices/newsSlice';
import specialProjectsReducer from './slices/specialProjectsSlice';
import materialsReducer from './slices/materialsSlice';

export const store = configureStore({
  reducer: {
    sampleBanners: sampleBannersReducer,
    searchBanner: searchBannerReducer,
    journals: journalReducer,
    news: newsReducer,
    specialProjects: specialProjectsReducer,
    materials: materialsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
