import { useSelector } from 'react-redux';

import MUITabs from '../../components/generic/MUITabs';
import PageContainer from '../../components/PageContainer';
import Forecast from '../../components/Forecast';
import History from '../../components/History';
import SportEvents from '../../components/SportEvents';

import { getUserLang } from '../../redux/slices/userSlice/user.selectors';

import i18l from '../../l18i.json';

const City = () => {
  const language = useSelector(getUserLang);

  return (
    <PageContainer>
      <section className="city container">
        <MUITabs
          tabsContent={[
          {
            label: i18l.pages.City.tabs.forecast[language] ?? "",
            content: <Forecast />
          },
          {
            label: i18l.pages.City.tabs.history[language] ?? "",
            content: <History />
          },
          {
            label: i18l.pages.City.tabs.events[language] ?? "",
            content: <SportEvents />
          }
        ]} />
      </section>
    </PageContainer>
  );
};

export default City;
