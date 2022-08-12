import { useSelector } from 'react-redux';
import { Paper, Grid } from '@mui/material';

import { getUserLang } from '../../redux/slices/userSlice/user.selectors';

import PageContainer from '../../components/PageContainer';

import i18l from '../../l18i.json';

const PageNotFound = () => {
  const language = useSelector(getUserLang);

  return (
    <PageContainer>
      <Grid
        className="container"
        sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}>
        <Paper
          elevation={3}
          sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3
        }}
             >
          <h2>{i18l.pages.notFound.title[language]}</h2>
          <h4>{i18l.pages.notFound.subtitle[language]}</h4>
        </Paper>
      </Grid>
    </PageContainer>
  );
}

export default PageNotFound;
