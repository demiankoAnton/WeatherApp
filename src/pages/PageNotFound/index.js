import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { getUserLang } from '../../redux/slices/userSlice/user.selectors';

import PageContainer from '../../components/PageContainer';

import i18l from '../../l18i.json';

const PageNotFound = () => {
  const language = useSelector(getUserLang);

  return (
    <PageContainer>
      <Box
        className="container"
        sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
             >
          <h2>{i18l.pages.notFound.title[language]}</h2>
          <h4>{i18l.pages.notFound.subtitle[language]}</h4>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default PageNotFound;
