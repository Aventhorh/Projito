import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks/hooks';

import Layout from '../Layout/Layout';
import { JournalPage, MainPage, NewsPage, SamplePage } from '../../pages';

import { fetchNews } from '../../services/slices/newsSlice';
import { fetchSampleBanners } from '../../services/slices/sampleBannersSlice';
import { fetchJournals } from '../../services/slices/journalSlice';
import { fetchMaterials } from '../../services/slices/materialsSlice';
import { fetchSearchBanner } from '../../services/slices/searchBannerSlice';
import { fetchSpecialProjects } from '../../services/slices/specialProjectsSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNews('news?_page=1&_limit=9'));
    dispatch(fetchSampleBanners('sample-banners'));
    dispatch(fetchJournals('journals?_page=1&_limit=9'));
    dispatch(fetchMaterials('materials'));
    dispatch(fetchSearchBanner('search-banner'));
    dispatch(fetchSpecialProjects('special-projects'));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="sample" element={<SamplePage />} />
      </Route>
    </Routes>
  );
};

export default App;
