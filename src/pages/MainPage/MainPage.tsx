import About from '../../components/About/About';
import Materials from '../../components/Materials/Materials';
import JournalMain from '../../components/JournalMain/JournalMain';
import NewsMain from '../../components/NewsMain/NewsMain';
import Prozhito from '../../components/Prozhito/Prozhito';
import SampleBanner from '../../components/SampleBanner/SampleBanner';
import SearchBanner from '../../components/SearchBanner/SearchBanner';
import SpecProjects from '../../components/SpecProjects/SpecProjects';

import { useAppSelector } from '../../services/hooks/hooks';
import { sampleBannerSelector } from '../../services/selectors';

export const MainPage = () => {
  const { isModalShown } = useAppSelector(sampleBannerSelector);

  return (
    <>
      <About />
      <Prozhito />
      <NewsMain />
      <Materials />
      <SearchBanner />
      <JournalMain />
      <SpecProjects />
      {isModalShown && <SampleBanner />}
    </>
  );
};
