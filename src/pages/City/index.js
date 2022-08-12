import MUITabs from '../../components/generic/MUITabs';

import PageContainer from '../../components/PageContainer';
import Forecast from '../../components/Forecast';
import History from '../../components/History';
import SportEvents from '../../components/SportEvents';

const City = () => {
  return (
    <PageContainer>
      <section className="container">
        <MUITabs sx={{
          "& > .MuiBox-root > .MuiTabs-root .MuiButtonBase-root": {
            background: "rgba(255, 255, 255, 0.6)"
          }
        }} tabsContent={[
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
