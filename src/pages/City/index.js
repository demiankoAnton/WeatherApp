// import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import MUITabs from '../../components/generic/MUITabs';

import PageContainer from '../../components/PageContainer';
import Forecast from '../../components/Forecast';
import History from '../../components/History';
import SportEvents from '../../components/SportEvents';

const City = () => {
  return (
    <PageContainer>
      <section className="container">
        <MUITabs tabsContent={[
          {
            label: "Forecast",
            content: <Forecast />
          },
          {
            label: "History",
            content: <History />
          },
          {
            label: "Sport Events",
            content: <SportEvents />
          }
        ]} />
      </section>
    </PageContainer>
  );
};

export default City;
